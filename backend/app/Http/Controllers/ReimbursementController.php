<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reimbursement;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use App\Models\Category;
use App\Models\ActivityLog;
use App\Models\User;
use App\Notifications\ReimbursementSubmitted;

class ReimbursementController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();

        if ($user->can('reimbursement.view_all')) 
        {
            $reimbursements = Reimbursement::withTrashed() // with soft-deleted
                ->with(['category', 'user'])
                ->latest()
                ->get();
        } 
        elseif ($user->can('reimbursement.view_own')) 
        {
            $reimbursements = Reimbursement::with('category')
                ->where('user_id', $user->id)
                ->latest()
                ->get();
        } 
        else 
        {
            return response()->json([
                'status' => false,
                'message' => 'You do not have permission'
            ], 403);
        }

        return response()->json([
            'status' => true,
            'data' => $reimbursements
        ]);
    }

    public function store(Request $request)
    {
        if (!auth()->user()->hasPermissionTo('reimbursement.create')) {
            return response()->json([
                'status' => false,
                'message' => 'Forbidden: You do not have permission'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'amount'      => 'required|numeric|min:0',
            'category_id' => 'required|exists:categories,id',
            'proof_file'  => 'nullable|file|mimes:pdf,jpg,jpeg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $userId = auth()->id();
        $category = Category::findOrFail($request->category_id);
        $currentMonth = now()->format('Y-m');

        // couting total reimbursement for the current month
        $totalThisMonth = Reimbursement::where('user_id', $userId)
            ->where('category_id', $category->id)
            ->whereBetween('submitted_at', [
                now()->startOfMonth(), now()->endOfMonth()
            ])
            ->sum('amount');

        $totalAfterSubmit = $totalThisMonth + $request->amount;

        if ($totalAfterSubmit > $category->limit_per_month) {
            return response()->json([
                'status' => false,
                'message' => "Monthly category limit '{$category->name}' has been exceeded. Current total:  Rp" . number_format($totalAfterSubmit, 0, ',', '.') . ", limit: Rp" . number_format($category->limit_per_month, 0, ',', '.'),
            ], 422);
        }

        $proofPath = $request->hasFile('proof_file')
            ? $request->file('proof_file')->store('proofs', 'public')
            : null;

        $reimbursement = Reimbursement::create([
            'title'        => $request->title,
            'description'  => $request->description,
            'amount'       => $request->amount,
            'category_id'  => $category->id,
            'proof_file'   => $proofPath,
            'user_id'      => $userId,
            'submitted_at' => now(),
        ]);

        // Log the activity
        ActivityLog::create([
            'user_id' => auth()->id(),
            'reimbursement_id' => $reimbursement->id,
            'action' => 'created',
            'description' => 'Reimbursement created',
        ]);

        // Notify managers about the new reimbursement
        $managers = User::role('manager')->get();
        foreach ($managers as $manager) {
            $manager->notify(new ReimbursementSubmitted($reimbursement));
        }

        return response()->json([
            'status' => true,
            'message' => 'Reimbursement submitted successfully',
            'data' => $reimbursement
        ], 201);
    }

    public function destroy($id)
    {
        if (!auth()->user()->hasPermissionTo('reimbursement.delete')) {
            return response()->json([
                'status' => false,
                'message' => 'Forbidden: You do not have permission'
            ], 403);
        }

        $user = auth()->user();

        $reimbursement = Reimbursement::find($id);

        if (!$reimbursement) {
            return response()->json([
                'status' => false,
                'message' => 'Reimbursement not found'
            ], 404);
        }
    
        if (!$user->can('reimbursement.view_all') && $reimbursement->user_id !== $user->id) {
            return response()->json([
                'status' => false,
                'message' => 'Forbidden: You can only delete your own reimbursement'
            ], 403);
        }

        $reimbursement->delete(); // Soft delete

        return response()->json([
            'status' => true,
            'message' => 'Reimbursement deleted successfully'
        ]);
    }

    public function approve($id)
    {
        if (!auth()->user()->hasPermissionTo('reimbursement.approve')) {
            return response()->json([
                'status' => false,
                'message' => 'Forbidden: You do not have permission'
            ], 403);
        }

        $reimbursement = Reimbursement::find($id);

        if (!$reimbursement) {
            return response()->json([
                'status' => false,
                'message' => 'Reimbursement not found'
            ], 404);
        }

        if ($reimbursement->status !== 'pending') {
            return response()->json([
                'status' => false,
                'message' => 'Reimbursement has already been processed'
            ], 400);
        }

        $reimbursement->status = 'approved';
        $reimbursement->approved_at = now();
        $reimbursement->updated_at = now();
        $reimbursement->save();

        ActivityLog::create([
            'user_id' => auth()->id(),
            'reimbursement_id' => $reimbursement->id,
            'action' => 'approved',
            'description' => 'Reimbursement approved',
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Reimbursement approved successfully',
            'data' => $reimbursement
        ]);
    }

    public function reject($id)
    {
        if (!auth()->user()->hasPermissionTo('reimbursement.reject')) {
            return response()->json([
                'status' => false,
                'message' => 'Forbidden: You do not have permission'
            ], 403);
        }

        $reimbursement = Reimbursement::find($id);

        if (!$reimbursement) {
            return response()->json([
                'status' => false,
                'message' => 'Reimbursement not found'
            ], 404);
        }

        if ($reimbursement->status !== 'pending') {
            return response()->json([
                'status' => false,
                'message' => 'Reimbursement has already been processed'
            ], 400);
        }

        $reimbursement->status = 'rejected';
        $reimbursement->updated_at = now();
        $reimbursement->save();

        ActivityLog::create([
            'user_id' => auth()->id(),
            'reimbursement_id' => $reimbursement->id,
            'action' => 'rejected',
            'description' => 'Reimbursement rejected',
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Reimbursement rejected successfully',
            'data' => $reimbursement
        ]);
    }
}

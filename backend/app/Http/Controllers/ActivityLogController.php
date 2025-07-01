<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;

class ActivityLogController extends Controller
{
    public function index()
    {
        $logs = ActivityLog::with(['user:id,name', 'reimbursement:id,title'])
            ->latest()
            ->get();

        return response()->json([
            'status' => true,
            'data' => $logs
        ]);
    }
}


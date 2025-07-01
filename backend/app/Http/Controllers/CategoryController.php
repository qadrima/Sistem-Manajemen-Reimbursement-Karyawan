<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function index()
    {
        if (!auth()->user()->hasPermissionTo('categories.view')) {
            return response()->json([
                'status' => false,
                'message' => 'Forbidden: You do not have permission'
            ], 403);
        }

        return response()->json([
            'status' => true,
            'data' => Category::all(),
        ]);
    }

    public function store(Request $request)
    {
        if (!auth()->user()->hasPermissionTo('categories.create')) {
            return response()->json([
                'status' => false,
                'message' => 'Forbidden: You do not have permission'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:categories,name',
            'limit_per_month' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'errors' => $validator->errors()], 422);
        }

        $category = Category::create($request->only('name', 'limit_per_month'));

        return response()->json([
            'status' => true,
            'data' => $category,
        ], 201);
    }

    // public function show($id)
    // {
    //     $category = Category::find($id);

    //     if (!$category) {
    //         return response()->json(['status' => false, 'message' => 'Category not found'], 404);
    //     }

    //     return response()->json([
    //         'status' => true,
    //         'data' => $category,
    //     ]);
    // }

    public function update(Request $request, $id)
    {
        if (!auth()->user()->hasPermissionTo('categories.update')) {
            return response()->json([
                'status' => false,
                'message' => 'Forbidden: You do not have permission'
            ], 403);
        }

        $category = Category::find($id);

        if (!$category) {
            return response()->json(['status' => false, 'message' => 'Category not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:categories,name,' . $id,
            'limit_per_month' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'errors' => $validator->errors()], 422);
        }

        $category->update($request->only('name', 'limit_per_month'));

        return response()->json([
            'status' => true,
            'data' => $category,
        ]);
    }

    public function destroy($id)
    {
        if (!auth()->user()->hasPermissionTo('categories.delete')) {
            return response()->json([
                'status' => false,
                'message' => 'Forbidden: You do not have permission'
            ], 403);
        }

        $category = Category::find($id);

        if (!$category) {
            return response()->json(['status' => false, 'message' => 'Category not found'], 404);
        }

        $category->delete();

        return response()->json(['status' => true, 'message' => 'Category deleted successfully']);
    }
}

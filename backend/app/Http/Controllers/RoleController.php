<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class RoleController extends Controller
{
    public function index()
    {
        if (!auth()->user()->hasPermissionTo('roles.view')) {
            return response()->json([
                'status' => false,
                'message' => 'Forbidden: You do not have permission'
            ], 403);
        }

        $roles = Role::with('permissions')->get()->map(function ($role) {
            return [
                'id' => $role->id,
                'name' => $role->name,
                'permissions' => $role->permissions->pluck('name'), // atau array
            ];
        });
        return response()->json(['status' => true, 'data' => $roles]);
    }

    public function assignRole(Request $request, User $user)
    {
        if (!auth()->user()->hasPermissionTo('roles.assign')) {
            return response()->json([
                'status' => false,
                'message' => 'Forbidden: You do not have permission'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'role' => 'required|exists:roles,name',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $user->syncRoles([$request->role]);

        return response()->json([
            'status' => true,
            'message' => "Role '{$request->role}' assigned to user successfully",
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'roles' => $user->getRoleNames()
            ]
        ]);
    }

    /*
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:roles,name',
            'permissions' => 'array',
            'permissions.*' => 'exists:permissions,name',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'errors' => $validator->errors()], 422);
        }

        $role = Role::create(['name' => $request->name]);
        $role->syncPermissions($request->permissions ?? []);

        return response()->json(['status' => true, 'data' => $role]);
    }

    public function show($id)
    {
        $role = Role::with('permissions')->find($id);

        if (!$role) {
            return response()->json(['status' => false, 'message' => 'Role not found'], 404);
        }

        return response()->json(['status' => true, 'data' => $role]);
    }

    public function update(Request $request, $id)
    {
        $role = Role::find($id);

        if (!$role) {
            return response()->json(['status' => false, 'message' => 'Role not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:roles,name,' . $id,
            'permissions' => 'array',
            'permissions.*' => 'exists:permissions,name',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => false, 'errors' => $validator->errors()], 422);
        }

        $role->name = $request->name;
        $role->save();
        $role->syncPermissions($request->permissions ?? []);

        return response()->json(['status' => true, 'data' => $role]);
    }

    public function destroy($id)
    {
        $role = Role::find($id);

        if (!$role) {
            return response()->json(['status' => false, 'message' => 'Role not found'], 404);
        }

        $role->delete();

        return response()->json(['status' => true, 'message' => 'Role deleted successfully']);
    }
     */
}

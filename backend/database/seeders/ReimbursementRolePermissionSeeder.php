<?php

namespace Database\Seeders;

// database/seeders/ReimbursementRolePermissionSeeder.php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class ReimbursementRolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Daftar permission
        $permissions = [
            'reimbursement.create',
            'reimbursement.view_own',
            'reimbursement.delete',
            'reimbursement.approve',
            'reimbursement.reject',
            'reimbursement.view_all',
            'categories.create',
            'categories.view',
            'categories.update',
            'categories.delete',
            'roles.view',
            'roles.assign',
        ];

        // Buat permissions jika belum ada
        foreach ($permissions as $perm) {
            Permission::firstOrCreate(['name' => $perm]);
        }

        // Buat role & assign permission

        // Employee
        $employee = Role::firstOrCreate(['name' => 'employee']);
        $employee->syncPermissions([
            'reimbursement.create',
            'reimbursement.view_own',
        ]);

        // Manager
        $manager = Role::firstOrCreate(['name' => 'manager']);
        $manager->syncPermissions([
            'reimbursement.approve',
            'reimbursement.reject',
        ]);

        // Admin
        $admin = Role::firstOrCreate(['name' => 'admin']);
        $admin->syncPermissions([
            'reimbursement.view_all',
            'categories.create',
            'categories.view',
            'categories.update',
            'categories.delete',
            'roles.view',
            'roles.assign',
        ]);

        $superadmin = Role::firstOrCreate(['name' => 'superadmin']);
        $superadmin->syncPermissions(Permission::all());

        echo "Roles and permissions for Reimbursement created.\n";
    }
}


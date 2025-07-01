<?php

namespace Database\Seeders;

// database/seeders/SuperAdminSeeder.php

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;

class SuperAdminSeeder extends Seeder
{
    public function run(): void
    {
        $email = 'superadmin@example.com';
        $existingUser = User::where('email', $email)->first();

        if (!$existingUser) {
            $role = Role::firstOrCreate(['name' => 'superadmin']);

            $user = User::create([
                'name' => 'Super Admin',
                'email' => $email,
                'password' => Hash::make('123456'),
            ]);

            $user->assignRole($role);

            echo "Superadmin created.\n";
        } else {
            echo "Superadmin already exists.\n";
        }

        $email = 'admin@example.com';
        $existingUser = User::where('email', $email)->first();

        if (!$existingUser) {
            $role = Role::firstOrCreate(['name' => 'admin']);

            $user = User::create([
                'name' => 'Admin',
                'email' => $email,
                'password' => Hash::make('123456'),
            ]);

            $user->assignRole($role);

            echo "admin created.\n";
        } else {
            echo "admin already exists.\n";
        }

        $email = 'manager@example.com';
        $existingUser = User::where('email', $email)->first();

        if (!$existingUser) {
            $role = Role::firstOrCreate(['name' => 'manager']);

            $user = User::create([
                'name' => 'Manager',
                'email' => $email,
                'password' => Hash::make('123456'),
            ]);

            $user->assignRole($role);

            echo "Manager created.\n";
        } else {
            echo "Manager already exists.\n";
        }

        $email = 'employee@example.com';
        $existingUser = User::where('email', $email)->first();

        if (!$existingUser) {
            $role = Role::firstOrCreate(['name' => 'employee']);

            $user = User::create([
                'name' => 'Employee',
                'email' => $email,
                'password' => Hash::make('123456'),
            ]);

            $user->assignRole($role);

            echo "Employee created.\n";
        } else {
            echo "Employee already exists.\n";
        }
    }
}
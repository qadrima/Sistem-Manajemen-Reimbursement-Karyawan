<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Transportasi', 'limit_per_month' => 100000],
            ['name' => 'Kesehatan',    'limit_per_month' => 200000],
            ['name' => 'Makan',        'limit_per_month' => 50000],
        ];

        foreach ($categories as $data) {
            Category::firstOrCreate(
                ['name' => $data['name']],
                ['limit_per_month' => $data['limit_per_month']]
            );
        }

        echo "Categories seeded successfully.\n";
    }
}


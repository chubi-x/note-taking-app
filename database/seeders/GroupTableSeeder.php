<?php

namespace Database\Seeders;

use App\Models\Group;
use App\Models\Todo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GroupTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //create groups for a user
        Group::factory()->has(Todo::factory())->count(5)->create();
    }
}

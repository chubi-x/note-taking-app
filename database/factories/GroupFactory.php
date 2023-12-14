<?php

namespace Database\Factories;

use App\Models\Group;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class GroupFactory extends Factory {
    protected $model = Group::class;

    public function definition() {
        return [
            "name" => fake()->word(),
            "user_id" => User::find(1)->id
        ];
    }
}

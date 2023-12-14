<?php

namespace Database\Factories;

use App\Models\Todo;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TodoFactory extends Factory {
    protected $model = Todo::class;

    public function definition() {
        return [
            'user_id' => User::find(1)->id,
            'name' => fake()->sentence(5),
            'completed' => false,
        ];
    }
}

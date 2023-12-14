<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    protected $casts = [
        'completed' => 'boolean',
        'recycled' => 'boolean',
    ];
    use HasFactory;
    public function group() {
        return $this->belongsTo(Group::class);
    }
    public function user() {
        return $this->belongsTo(User::class);
    }
}

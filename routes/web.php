<?php

use App\Http\Controllers\GroupController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TodoController;
use App\Models\Group;
use App\Models\Todo;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware('auth')->group(function () {

    Route::get('/profile', [ProfileController::class, 'index'])->name('profile');
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::patch('/profile/password', [ProfileController::class, 'updatePassword'])->name('profile.password.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

//get all todos
    Route::get('/', function(){
        $todos = Todo::all()->where('user_id', auth()->user()->id);
        foreach ($todos as $todo) {
            $todo->group;
        }
        $groups = Group::all()->where('user_id', auth()->user()->id);
        foreach ($groups as $group) {
            $group->todos;
        }
        return Inertia::render('Home', [
            'todos' => $todos,
            'groups' => $groups
        ]);
    })->name('todos.index');
//create todo
    Route::post('/todos', [TodoController::class, 'store'])->name('todos.store');
//update todo
    Route::patch('/todos/{todo}', [TodoController::class, 'update'])->name('todos.update');

    //recycle todo
    Route::patch('/todos/{todo}/recycle', [TodoController::class, 'recycle'])->name('todos.recycle');
    //restore todo
    Route::patch('/todos/{todo}/restore', [TodoController::class, 'restore'])->name('todos.restore');
//delete todo
    Route::delete('/todos/{todo}', [TodoController::class, 'destroy'])->name('todos.destroy');
//mark todo as completed
    Route::patch('/todos/{todo}/complete', [TodoController::class, 'complete'])->name('todos.complete');
//create group
    Route::post('/groups', [GroupController::class, 'store'])->name('groups.store');
//update group
    Route::patch('/groups/{group}', [GroupController::class, 'update'])->name('groups.update');
// add todo to group
    Route::post('/todos/{todo}/groups', [TodoController::class, 'addTodo'])->name('todos.groups.add');
// remove todo from group
    Route::delete('/todos/{todo}/groups/{group}', [GroupController::class, 'removeTodo'])->name('todos.groups.remove');
//delete group
    Route::delete('/groups/{group}', [GroupController::class, 'destroy'])->name('groups.destroy');

});

require __DIR__.'/auth.php';

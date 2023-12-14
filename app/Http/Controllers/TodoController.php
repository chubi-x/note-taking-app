<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\Todo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //list all user todos
        $todos = Todo::all()->where('user_id', auth()->user()->id);
        //get groups for each todo
        foreach ($todos as $todo) {
            $todo->group;
        }
       return Inertia::render('Home', [
           'todos' => $todos
       ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //validate request
        $request->validate([
            'name' => 'required',
        ]);
        //create todo
        $todo = new Todo;
        $todo->name = $request->all()["name"];
        $todo->user()->associate($request->user()->id);
        $todo->save();
        return redirect()->back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //validate request
        $request->validate([
            'name' => 'required',
        ]);
        //update todo
        $todo = Todo::find($id);
        $todo->name = $request->all()["name"];
        $todo->completed = false;
        $todo->save();
        return redirect()->back();
    }
    public function complete(Request $request, string $id)
    {
        //update todo
        $todo = Todo::find($id);
        $todo->completed = !$todo->completed;
        $todo->save();
        return redirect()->back();
    }
    public function addTodo(Request $request, string $id)    {
        //add todo to group
        $todo = Todo::find($id);
        $todo->group()->associate($request->all()["group_id"]);
        $todo->save();
        return redirect()->back();
    }

    public function recycle(Request $request, string $id)
    {
        //recycle todo
        $todo = Todo::find($id);
        $todo->recycled = true;
        $todo->save();
        return redirect()->back();
    }
    public function restore(Request $request, string $id)
    {
        //restore todo
        $todo = Todo::find($id);
        $todo->recycled = false;
        $todo->save();
        return redirect()->back();
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //delete todo
        $todo = Todo::find($id);
        $todo->delete();
        return redirect()->back();
    }

}

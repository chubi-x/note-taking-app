<?php

namespace App\Http\Controllers;

use App\Models\Group;
use Illuminate\Http\Request;

class GroupController extends Controller
{
    /**
     * Get all groups
     */
    public function index()
    {
        //
    }

    /**
     * Create group
     */
    public function store(Request $request)
    {
        //create group
        $group = new Group;
        $group->name = $request->all()["name"];
        $group->user()->associate($request->user()->id);
        $group->save();
        return redirect()->back();
    }
    /**
     * Delete group
     */
    public function destroy(string $id)
    {
        //delete group
        $group = Group::find($id);
        //delete todos in group
        foreach ($group->todos as $todo) {
            $todo->delete();
        }
        $group->delete();
        return redirect()->back();
    }
    /**
     * Update group
     */
    public function update(Request $request, string $id)   {
        //update group
        $group = Group::find($id);
        $group->name = $request->all()["name"];
        $group->save();
        return redirect()->back();
    }
    /**
     * Add todo to a group
     */

}

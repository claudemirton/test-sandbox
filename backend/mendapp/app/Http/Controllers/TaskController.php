<?php

namespace App\Http\Controllers;

use App\Task;
use App\Http\Resources\Task as TaskResource;

use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        return Task::all();
    }

    public function show($id)
    {
        return Task::findOrFail($id);
    }

    public function store(Request $request)
    {
        $request->validate([
            'task' => 'required|max:255',
        ]);

        $task = Task::create($request->all());

        return (new TaskResource($task))
            ->response()
            ->setStatusCode(201);
    }

    public function delete($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();

        return response()->json(null, 204);
    }

    public function update($id, Request $request)
    {
        $task = Task::findOrFail($id);

        
        $request->validate([
            'task' => 'required|max:255',
        ]);
        
        $valores = $request->all();
        $task->fill($valores)->save();

        return (new TaskResource($task))
            ->response()
            ->setStatusCode(201);
    }
}

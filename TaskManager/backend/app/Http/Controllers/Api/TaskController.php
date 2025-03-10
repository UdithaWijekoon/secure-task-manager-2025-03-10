<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a list of tasks for the authenticated user.
     */
    public function index()
    {
        return Task::where('user_id', auth()->id())->get();
    }

    /**
     * Add a new task for the authenticated user.
     */
    public function store(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'title' => 'required|string',
            'status' => 'required|in:pending,in-progress',
        ]);

        // Create a new task in the database
        $task = Task::create([
            'user_id' => auth()->id(),
            'title' => $request->title,
            'description' => $request->description,
            'status' => $request->status,
        ]);

        // Return the created task with a 201 status code
        return response()->json($task, 201);
    }

    /**
     * Update an existing task's status.
     */
    public function update(Request $request, $id)
    {
        // Find the task by ID
        $task = Task::find($id);

        // If task not found, return 404
        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        // Validate incoming data
        $request->validate([
            'status' => 'required|in:pending,in-progress,completed',
        ]);

        // Update the task attributes and save
        $task->status = $request->input('status');
        $task->save();

        // Return the updated task
        return response()->json($task, 200);
    }

    /**
     * Delete a task by its ID.
     */
    public function destroy($id)
    {
        // Find the task by ID
        $task = Task::find($id);

        // If task not found, return 404
        if (!$task) {
            return response()->json(['message' => 'Task not found'], 404);
        }

        // Delete the task from the database
        $task->delete();

        // Return success message
        return response()->json(['message' => 'Task deleted successfully'], 200);
    }
}

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\TaskController;

// Route to get the total number of users (public access)
Route::get('/total-users', [AuthController::class, 'getTotalUsers']);

// Authentication Routes (Publicly Accessible)
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Routes protected by authentication middleware (Only accessible to authenticated users)
Route::middleware('auth:api')->group(function () {

    // Get the authenticated user's details
    Route::get('/me', [AuthController::class, 'me']);

    // Logout the user and invalidate the token
    Route::post('/logout', [AuthController::class, 'logout']);

    // Task Management Routes (Only for logged-in users)
    Route::get('/tasks', [TaskController::class, 'index']); // Get tasks
    Route::post('/tasks', [TaskController::class, 'store']); // Create task
    Route::put('/tasks/{id}', [TaskController::class, 'update']); // Update task
    Route::delete('/tasks/{id}', [TaskController::class, 'destroy']); // Delete task
});

<?php

use Illuminate\Support\Facades\Route;

Route::post('login', [\App\Http\Controllers\UserController::class, 'login']);
Route::post('register', [\App\Http\Controllers\UserController::class, 'register']);

Route::middleware('auth:sanctum')->post('/upload', [\App\Http\Controllers\PhotoController::class, 'upload']);

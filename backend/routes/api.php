<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ReimbursementController;
use App\Http\Controllers\ActivityLogController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::post('/login', [AuthController::class, 'login']);

Route::middleware(['jwt.verify'])->group(function () {

    Route::get('/users', [AuthController::class, 'index']);
    Route::post('/user', [AuthController::class, 'create']);
    Route::post('/user/{user}/assign-role', [RoleController::class, 'assignRole']);

    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/categories', [CategoryController::class, 'index']);
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);

    Route::post('/reimbursements', [ReimbursementController::class, 'store']);
    Route::get('/reimbursements', [ReimbursementController::class, 'index']);
    Route::delete('/reimbursements/{id}', [ReimbursementController::class, 'destroy']);
    Route::post('/reimbursements/{id}/approve', [ReimbursementController::class, 'approve']);
    Route::post('/reimbursements/{id}/reject', [ReimbursementController::class, 'reject']);

    Route::get('/roles', [RoleController::class, 'index']);

    Route::get('/activity-logs', [ActivityLogController::class, 'index']);
});


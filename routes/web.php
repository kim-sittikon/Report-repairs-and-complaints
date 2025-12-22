<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\AdminLocationController;
use App\Http\Controllers\AdminKeywordController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');

    Route::prefix('report')->name('report.')->group(function () {
        Route::get('/', function () { 
            return Inertia::render('Report/Dashboard'); 
        })->name('index');
        Route::get('/create-news', function () {
             return Inertia::render('Report/CreateNews');
        })->name('create-news');
        Route::get('/list-report', function () {
             return Inertia::render('Report/ListReport');
        })->name('list-report');
        Route::get('/create-job', function (Request $request) {
             return Inertia::render('Report/CreateJob', [
                 'selectedReports' => $request->input('selectedReports', [])
             ]);
        })->name('create-job');
        Route::get('/all-jobs', function () {
             return Inertia::render('Report/AllJobs');
        })->name('all-jobs');
        Route::get('/my-jobs', function () {
             return Inertia::render('Report/MyJobs');
        })->name('my-jobs');
        Route::get('/change-status', function (Request $request) {
             return Inertia::render('Report/ChangeStatus', [
                 'selectedReports' => $request->input('selectedReports', [])
             ]);
        })->name('change-status');
        Route::get('/manage-job', function (Request $request) {
             return Inertia::render('Report/ManageJob');
        })->name('manage-job');
        
        Route::get('/manage-keyword', function () {
             return Inertia::render('Report/ManageKeyword');
        })->name('manage-keyword');
        Route::get('/request', function () {
             // Request / Keywords page? Not found in files, might be ChangeStatus or CreateJob?
             // Based on dropdown it is "กำหนดคีเวิร์ด" -> maybe CreateJob or separate.
             // But dropdown said /report/request.
             // Files: Create.jsx, ChangeStatus.jsx. 
             // Logic: Check files later. Stubbing for now.
             return Inertia::render('Report/Dashboard'); // Placeholder
        })->name('request');
        
        // Existing routes logic
        Route::get('/create', [App\Http\Controllers\ReportController::class, 'create'])->name('create');
        Route::post('/', [App\Http\Controllers\ReportController::class, 'store'])->name('store');
        Route::get('/history', [App\Http\Controllers\ReportController::class, 'history'])->name('history');
    });

    Route::get('/job', function () {
        return Inertia::render('Job/Index'); // Stub
    })->name('job.index');

    Route::get('/admin', [App\Http\Controllers\AdminDashboardController::class, 'index'])->name('admin.index');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Admin Routes
    Route::prefix('admin')->name('admin.')->group(function () {
        // Locations (Buildings & Rooms)
        Route::get('/locations', [App\Http\Controllers\AdminLocationController::class, 'index'])->name('locations.index');
        Route::post('/buildings', [App\Http\Controllers\AdminLocationController::class, 'storeBuilding'])->name('buildings.store');
        Route::delete('/buildings/{id}', [App\Http\Controllers\AdminLocationController::class, 'destroyBuilding'])->name('buildings.destroy');
        Route::post('/rooms', [App\Http\Controllers\AdminLocationController::class, 'storeRoom'])->name('rooms.store');
        Route::put('/rooms/{id}', [App\Http\Controllers\AdminLocationController::class, 'updateRoom'])->name('rooms.update');
        Route::delete('/rooms/{id}', [App\Http\Controllers\AdminLocationController::class, 'destroyRoom'])->name('rooms.destroy');

        // Keywords
        Route::get('/keywords', [App\Http\Controllers\AdminKeywordController::class, 'index'])->name('keywords.index');
        Route::post('/keywords', [App\Http\Controllers\AdminKeywordController::class, 'store'])->name('keywords.store');
        Route::put('/keywords/{id}', [App\Http\Controllers\AdminKeywordController::class, 'update'])->name('keywords.update');
        Route::delete('/keywords/{id}', [App\Http\Controllers\AdminKeywordController::class, 'destroy'])->name('keywords.destroy');
    });
});

require __DIR__ . '/auth.php';

<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\InviteController;
use App\Http\Controllers\AdminUserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');

    Route::prefix('report')->name('report.')->group(function () {
        Route::get('/', [App\Http\Controllers\ReportController::class, 'index'])->name('index');
        Route::get('/create', [App\Http\Controllers\ReportController::class, 'create'])->name('create');
        Route::post('/', [App\Http\Controllers\ReportController::class, 'store'])->name('store');
        Route::get('/history', [App\Http\Controllers\ReportController::class, 'history'])->name('history');
    });

    Route::prefix('repair')->name('repair.')->group(function () {
        // ... other repair routes if any ...
        Route::get('/keywords', [\App\Http\Controllers\PersonalKeywordController::class, 'indexRepair'])->name('keywords');
    });

    Route::get('/job', function () {
        return Inertia::render('Job/Index'); // Stub
    })->name('job.index');

    // Complaint Routes
    Route::prefix('complaints')->name('complaints.')->group(function () {
        Route::get('/dashboard', [App\Http\Controllers\ComplaintController::class, 'dashboard'])->name('dashboard');
        Route::get('/list', [App\Http\Controllers\ComplaintController::class, 'index'])->name('index');
        Route::get('/keywords', [\App\Http\Controllers\PersonalKeywordController::class, 'indexComplaint'])->name('keywords');
    });

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

        // User Management
        Route::get('/users', [AdminUserController::class, 'index'])->name('users.index');
        Route::get('/users/invite', [AdminUserController::class, 'create'])->name('users.invite');
        Route::post('/users/invite', [AdminUserController::class, 'invite'])->name('users.invite.send');
        Route::post('/users/bulk', [AdminUserController::class, 'bulkStore'])->name('users.bulk');
        Route::post('/users/{id}/resend', [AdminUserController::class, 'resend'])->name('users.resend');
        Route::delete('/users/{id}/cancel', [AdminUserController::class, 'cancel'])->name('users.cancel');
    });
    // Personal Keywords CRUD
    Route::name('keywords.personal.')->group(function () {
        Route::post('/keywords/personal', [\App\Http\Controllers\PersonalKeywordController::class, 'store'])->name('store');
        Route::put('/keywords/personal/{id}', [\App\Http\Controllers\PersonalKeywordController::class, 'update'])->name('update');
        Route::delete('/keywords/personal/{id}', [\App\Http\Controllers\PersonalKeywordController::class, 'destroy'])->name('destroy');
    });
});

// Guest Routes (Invitation Acceptance)
Route::middleware('guest')->group(function () {
    Route::get('/invite/{account}', [InviteController::class, 'show'])
        ->middleware('signed')
        ->name('invite.accept');
    Route::post('/invite/{account}', [InviteController::class, 'store'])
        ->name('invite.store');
});

require __DIR__ . '/auth.php';

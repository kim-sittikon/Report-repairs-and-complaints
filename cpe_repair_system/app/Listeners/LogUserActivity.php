<?php

namespace App\Listeners;

use App\Models\UserActivityLog;
use Illuminate\Auth\Events\Login;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class LogUserActivity
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(Login $event): void
    {
        // Log user login activity
        UserActivityLog::create([
            'account_id' => $event->user->getAuthIdentifier(), // Get authenticated user's ID
            'activity_type' => 'login',
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
        ]);
    }
}

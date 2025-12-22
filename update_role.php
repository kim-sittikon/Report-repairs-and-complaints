<?php
$user = App\Models\Account::where('email', 'user123@example.com')->first();
if ($user) {
    $user->role = 'staff';
    $user->job_repair = true;
    $user->job_admin = true;
    $user->job_complaint = true;
    $user->save();
    echo "Updated user: " . $user->email . " to role: " . $user->role . "\n";
} else {
    echo "User not found.\n";
}

<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Mail\UserInvitationMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AdminUserController extends Controller
{
    /**
     * แสดงหน้าฟอร์มเชิญผู้ใช้ใหม่
     */
    public function index()
    {
        return Inertia::render('Admin/UserList', [
            'activeUsers' => Account::active()->orderBy('created_at', 'desc')->get(),
            'pendingUsers' => Account::pending()->orderBy('invitation_sent_at', 'desc')->get(),
        ]);
    }

    public function create()
    {
        // Fetch recent invites for history
        $recentInvites = Account::where('invited_by', auth()->id())
            ->orderBy('invitation_sent_at', 'desc')
            ->take(5)
            ->get();

        return Inertia::render('Admin/InviteUser', [
            'recentInvites' => $recentInvites
        ]);
    }

    public function invite(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|unique:accounts,email',
            'role' => 'required|in:admin,staff,teacher,student',
            'job_repair' => 'boolean',
            'job_admin' => 'boolean',
            'job_complaint' => 'boolean',
        ]);

        $account = Account::create([
            'email' => $validated['email'],
            'role' => $validated['role'],
            'first_name' => 'Invited',
            'last_name' => 'User',
            'status' => 'pending',
            'password_hash' => Hash::make(Str::random(32)),
            'verified' => false,
            'job_complaint' => true,
            'job_repair' => $validated['job_repair'] ?? false,
            'job_admin' => $validated['job_admin'] ?? false,
            'invited_by' => auth()->id(),
            'invitation_sent_at' => now(),
            'invitation_expires_at' => now()->addHours(24),
        ]);

        $this->sendInvitationEmail($account);

        return back()->with('success', 'ส่งคำเชิญเรียบร้อยแล้ว');
    }

    public function resend($id)
    {
        $account = Account::pending()->findOrFail($id);

        // Update timestamp to invalidate old links
        $account->touch();
        $account->update(['invitation_expires_at' => now()->addHours(24)]);

        $this->sendInvitationEmail($account);

        return back()->with('success', 'ส่งคำเชิญซ้ำเรียบร้อยแล้ว');
    }

    public function cancel($id)
    {
        $account = Account::pending()->findOrFail($id);
        $account->delete(); // Hard delete or Soft delete depending on model config. Assuming Hard delete for Plan B simplicity.

        return back()->with('success', 'ยกเลิกคำเชิญเรียบร้อยแล้ว');
    }

    public function bulkStore(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:csv,txt',
        ]);

        $file = $request->file('file');
        $fileContents = file($file->getPathname());
        $count = 0;

        foreach ($fileContents as $line) {
            $data = str_getcsv($line);
            if (empty($data[0]))
                continue; // Skip empty lines

            // CSV Format: email,role (optional)
            $email = trim($data[0]);
            $role = isset($data[1]) ? trim($data[1]) : 'student'; // Default role

            // Skip invalid email format
            if (!filter_var($email, FILTER_VALIDATE_EMAIL))
                continue;

            // Check if email already exists
            if (Account::where('email', $email)->exists())
                continue;

            $account = Account::create([
                'email' => $email,
                'role' => $role,
                'first_name' => 'Invited',
                'last_name' => 'User',
                'status' => 'pending',
                'password_hash' => Hash::make(Str::random(32)),
                'verified' => false,
                'job_complaint' => true,
                'job_repair' => in_array($role, ['staff', 'admin']),
                'job_admin' => $role === 'admin',
                'invited_by' => auth()->id(),
                'invitation_sent_at' => now(),
                'invitation_expires_at' => now()->addHours(24),
            ]);

            $this->sendInvitationEmail($account);
            $count++;
        }

        return back()->with('success', "นำเข้าและส่งคำเชิญเรียบร้อยแล้ว $count รายการ");
    }

    private function sendInvitationEmail($account)
    {
        $url = URL::temporarySignedRoute(
            'invite.accept',
            now()->addHours(24),
            [
                'account' => $account->account_id,
                'state' => $account->updated_at->timestamp // Security Nuance: Invalidate old links
            ]
        );

        Mail::to($account->email)->send(
            new UserInvitationMail($url, $account->role)
        );
    }
}

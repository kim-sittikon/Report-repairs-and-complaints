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
    public function create()
    {
        // ดึงรายการคำเชิญล่าสุด 5 รายการ เพื่อแสดงประวัติ
        $recentInvites = Account::where('invited_by', auth()->id())
            ->orderBy('invitation_sent_at', 'desc')
            ->take(5)
            ->get();

        return Inertia::render('Admin/InviteUser', [
            'recentInvites' => $recentInvites
        ]);
    }

    /**
     * ส่งคำเชิญไปที่อีเมล์
     */
    public function invite(Request $request)
    {
        // 1. Validate ข้อมูล
        $validated = $request->validate([
            'email' => 'required|email|unique:accounts,email',
            'role' => 'required|in:admin,staff,teacher,student',
            'job_repair' => 'boolean',
            'job_admin' => 'boolean',
            'job_complaint' => 'boolean',
        ]);

        // 2. สร้าง Account รอไว้ (Status = pending)
        // หมายเหตุ: Password ใส่แบบสุ่มไปก่อน (User ไม่ต้องรู้ เพราะเดี๋ยวเขาตั้งใหม่เอง)
        // Bug Fix: ต้องใส่ first_name, last_name หลอกๆ ไปก่อน เพราะ Database บังคับห้ามเป็น Null
        $account = Account::create([
            'email' => $validated['email'],
            'role' => $validated['role'],
            'first_name' => 'Invited', // Placeholder
            'last_name' => 'User',     // Placeholder
            'status' => 'pending',
            'password_hash' => Hash::make(Str::random(32)), // Correct column name matches Account model/DB
            'verified' => false, // Keep this as it was in the original

            // Logic สิทธิ์การใช้งาน
            'job_complaint' => true, // ทุกคนต้องร้องเรียนได้
            'job_repair' => $validated['job_repair'] ?? false,
            'job_admin' => $validated['job_admin'] ?? false,

            // Metadata
            'invited_by' => auth()->id(),
            'invitation_sent_at' => now(),
            'invitation_expires_at' => now()->addHours(24),
        ]);

        // 3. สร้าง Signed URL (ลิงก์ที่มีลายเซ็น ใช้ได้ 24 ชม.)
        $url = URL::temporarySignedRoute(
            'invite.accept',
            now()->addHours(24),
            ['account' => $account->account_id]
        );

        // 4. ส่งอีเมล
        Mail::to($account->email)->send(
            new UserInvitationMail($url, $account->role)
        );

        return back()->with('success', 'ส่งคำเชิญไปที่ ' . $validated['email'] . ' เรียบร้อยแล้ว');
    }

    /**
     * แสดงรายการผู้ใช้ทั้งหมด
     */
    public function index()
    {
        $users = Account::orderBy('created_at', 'desc')->get();

        return Inertia::render('Admin/UserList', [
            'users' => $users,
        ]);
    }
}

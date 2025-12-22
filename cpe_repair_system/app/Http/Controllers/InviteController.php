<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class InviteController extends Controller
{
    /**
     * แสดงหน้าฟอร์มตั้งรหัสผ่าน (เมื่อกดลิงก์จากเมล)
     * Signed URL middleware จะตรวจสอบความ valid ให้อัตโนมัติ
     */
    public function show(Account $account)
    {
        // เช็คว่า Account นี้ Active แล้วหรือยัง
        if ($account->status === 'active') {
            return redirect()->route('login')->with('error', 'ลิงก์นี้ถูกใช้งานไปแล้ว กรุณาเข้าสู่ระบบด้วยรหัสผ่านของคุณ');
        }

        // เช็คว่าคำเชิญหมดอายุหรือยัง
        if ($account->invitation_expires_at && now()->isAfter($account->invitation_expires_at)) {
            return Inertia::render('Auth/InvitationExpired', [
                'email' => $account->email,
            ]);
        }

        return Inertia::render('Auth/SetPassword', [
            'account' => [
                'account_id' => $account->account_id,
                'email' => $account->email,
                'role' => $account->role,
            ],
        ]);
    }

    /**
     * บันทึกข้อมูลและ Activate Account
     */
    public function store(Request $request, Account $account)
    {
        // Validate
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'password' => 'required|confirmed|min:8',
        ]);

        // อัปเดตข้อมูลและเปลี่ยนสถานะเป็น Active
        $account->update([
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'password_hash' => Hash::make($validated['password']),
            'status' => 'active',
            'verified' => true,
        ]);

        // Login อัตโนมัติ
        Auth::login($account);

        return redirect()->route('dashboard')->with('success', 'ยินดีต้อนรับเข้าสู่ระบบ!');
    }
}

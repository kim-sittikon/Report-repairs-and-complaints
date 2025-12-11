<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Inertia\Inertia;

class ReportController extends Controller
{
    public function index()
    {
        // For now, redirect to create or show list
        return Inertia::render('Report/Index');
    }

    public function create()
    {
        return Inertia::render('Groups/Report/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required|in:repair,complaint',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location_id' => 'required|exists:building,building_id',
            'room' => 'required|string|max:255',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $user = auth()->user();

        // 1. Resolve Room (Find or Create)
        $room = \App\Models\Room::firstOrCreate(
            [
                'room_name' => $request->room,
                'building_id' => $request->location_id
            ],
            [
                'account_id' => $user->account_id
            ]
        );

        $requestModel = null;
        $message = '';

        // 2. Create Request (Repair or Complaint)
        if ($request->type === 'repair') {
            $requestModel = \App\Models\RequestRepair::create([
                'title' => $request->title,
                'description' => $request->description,
                'status' => 'pending',
                'priority' => 1,
                'account_id' => $user->account_id,
                'building_id' => $request->location_id,
                'room_id' => $room->room_id,
            ]);
            $message = 'Repair request submitted successfully.';
        } else {
            $requestModel = \App\Models\RequestComplaint::create([
                'title' => $request->title,
                'description' => $request->description,
                'status' => 'pending',
                'priority' => 1,
                'account_id' => $user->account_id,
                'building_id' => $request->location_id,
                'room_id' => $room->room_id,
            ]);
            $message = 'Complaint submitted successfully.';
        }

        // 3. Handle File Uploads
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('uploads/reports', 'public');

                if ($request->type === 'repair') {
                    \App\Models\FileRepair::create([
                        'repair_id' => $requestModel->repair_id,
                        'file_name' => $image->getClientOriginalName(),
                        'file_path' => $path,
                        'uploaded_at' => now()
                    ]);
                } else {
                    \App\Models\FileComplaint::create([
                        'complaint_id' => $requestModel->complaint_id,
                        'file_name' => $image->getClientOriginalName(),
                        'file_path' => $path,
                        'uploaded_at' => now()
                    ]);
                }
            }
        }

        return redirect()->route('dashboard')->with('success', $message);
    }
}

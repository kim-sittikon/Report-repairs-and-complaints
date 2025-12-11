<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        // 1. Fetch Urgent News (Limit 3)
        $urgentNews = Announcement::with('account:account_id,first_name,last_name')
            ->where('is_urgent', true)
            ->latest()
            ->take(3)
            ->get();

        // 2. Fetch General News (Paginated 4)
        // You might want to sort by latest
        $generalNews = Announcement::with('account:account_id,first_name,last_name')
            ->where('is_urgent', false)
            ->latest()
            ->paginate(4); // Or get() if you don't want pagination yet

        return Inertia::render('Dashboard', [
            'urgent_news' => $urgentNews,
            'general_news' => $generalNews,
        ]);
    }
}

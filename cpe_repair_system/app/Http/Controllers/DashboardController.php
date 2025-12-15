<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Models\Account;
use App\Models\Building;
use App\Models\Room;
use App\Models\Keyword;
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
        $generalNews = Announcement::with('account:account_id,first_name,last_name')
            ->where('is_urgent', false)
            ->latest()
            ->paginate(4);

        // 3. Admin Statistics (if user is admin)
        $adminStats = null;
        $recentActivity = null;

        if (auth()->user() && auth()->user()->job_admin) {
            $adminStats = [
                'users' => Account::count(),
                'buildings' => Building::count(),
                'rooms' => Room::count(),
                'keywords' => Keyword::count(),
            ];

            // 4. Recent keyword activity
            $recentActivity = Keyword::with(['creator', 'editor', 'deleter'])
                ->withTrashed()
                ->orderBy('updated_at', 'desc')
                ->take(10)
                ->get()
                ->map(function ($keyword) {
                    // Determine action type
                    $action = 'updated';
                    $actor = null;

                    if ($keyword->deleted_at) {
                        $action = 'deleted';
                        $actor = $keyword->deleter;
                    } elseif ($keyword->created_at->equalTo($keyword->updated_at)) {
                        $action = 'created';
                        $actor = $keyword->creator;
                    } else {
                        $action = 'updated';
                        $actor = $keyword->editor ?? $keyword->creator;
                    }

                    return [
                        'id' => $keyword->id,
                        'action' => $action,
                        'keyword' => $keyword->keyword,
                        'type' => $keyword->type,
                        'actor_name' => $actor ? $actor->name : 'Unknown',
                        'time' => $keyword->updated_at->diffForHumans(),
                        'timestamp' => $keyword->updated_at,
                    ];
                });
        }

        return Inertia::render('Dashboard', [
            'urgent_news' => $urgentNews,
            'general_news' => $generalNews,
            'adminStats' => $adminStats,
            'recentActivity' => $recentActivity,
        ]);
    }
}

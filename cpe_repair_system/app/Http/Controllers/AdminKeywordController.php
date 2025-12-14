<?php

namespace App\Http\Controllers;

use App\Models\Keyword;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminKeywordController extends Controller
{
    /**
     * Display the keyword management page
     */
    public function index()
    {
        $keywords = Keyword::orderBy('type')->orderBy('keyword')->get();

        return Inertia::render('Admin/ManageKeywords', [
            'keywords' => $keywords,
        ]);
    }

    /**
     * Store a new keyword
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|in:repair,complaint',
            'keyword' => 'required|string|max:255',
        ]);

        // Check for duplicate
        $exists = Keyword::where('type', $validated['type'])
            ->where('keyword', $validated['keyword'])
            ->exists();

        if ($exists) {
            return back()->withErrors(['keyword' => 'คีย์เวิร์ดนี้มีอยู่แล้วในประเภทที่เลือก']);
        }

        Keyword::create($validated);

        return back()->with('success', 'เพิ่มคีย์เวิร์ดสำเร็จ');
    }

    /**
     * Update a keyword
     */
    public function update(Request $request, $id)
    {
        $keyword = Keyword::findOrFail($id);

        $validated = $request->validate([
            'type' => 'required|in:repair,complaint',
            'keyword' => 'required|string|max:255',
        ]);

        // Check for duplicate (excluding current keyword)
        $exists = Keyword::where('type', $validated['type'])
            ->where('keyword', $validated['keyword'])
            ->where('id', '!=', $id)
            ->exists();

        if ($exists) {
            return back()->withErrors(['keyword' => 'คีย์เวิร์ดนี้มีอยู่แล้วในประเภทที่เลือก']);
        }

        $keyword->update($validated);

        return back()->with('success', 'แก้ไขคีย์เวิร์ดสำเร็จ');
    }

    /**
     * Delete a keyword
     */
    public function destroy($id)
    {
        $keyword = Keyword::findOrFail($id);
        $keyword->delete();

        return back()->with('success', 'ลบคีย์เวิร์ดสำเร็จ');
    }
}

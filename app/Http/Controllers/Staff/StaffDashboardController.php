<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StaffDashboardController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('Staff/Dashboard', [
            'stats' => ['today' => 0],
            'recentScans' => []
        ]);
    }
}

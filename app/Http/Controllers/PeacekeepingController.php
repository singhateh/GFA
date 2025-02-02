<?php

namespace App\Http\Controllers;

use App\Models\Mission;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PeacekeepingController extends Controller
{
    public function index()
    {
        $missions = Mission::with(['missionType', 'sponsor'])->latest()->get();
        return Inertia::render('PO/Missions/Index', [
            'missions' => $missions,
        ]);
    }
}
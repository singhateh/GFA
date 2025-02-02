<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HealthHistoryController extends Controller
{
    public function index()
    {
        return Inertia::render('MRM/Histories/Index', []);
    }
}
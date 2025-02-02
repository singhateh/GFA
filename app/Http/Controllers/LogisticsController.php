<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class LogisticsController extends Controller
{
    public function index()
    {
        return Inertia::render('ASTM/Inven/Logistics/Index');
    }
}
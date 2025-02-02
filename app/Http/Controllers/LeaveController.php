<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class LeaveController extends Controller
{
    public function index()
    {
        return Inertia::render('HRM/LeaveAndVacationManagements/Index', [
            'recruitments' => [],
        ]);
    }
}
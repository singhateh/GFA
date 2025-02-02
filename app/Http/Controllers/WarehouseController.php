<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class WarehouseController extends Controller
{
    public function index()
    {
        return Inertia::render('ASTM/Inven/StorageWarehouses/Index');
    }
}
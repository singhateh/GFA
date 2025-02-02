<?php

namespace App\Http\Controllers;

use App\Models\ServiceStatusChange;
use App\Http\Requests\StoreServiceStatusChangeRequest;
use App\Http\Requests\UpdateServiceStatusChangeRequest;

class ServiceStatusChangeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreServiceStatusChangeRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ServiceStatusChange $serviceStatusChange)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ServiceStatusChange $serviceStatusChange)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateServiceStatusChangeRequest $request, ServiceStatusChange $serviceStatusChange)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ServiceStatusChange $serviceStatusChange)
    {
        //
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Payroll;
use App\Models\Staff;
use App\Models\StaffMember;
use Inertia\Inertia;

class PayrollController extends Controller
{
    /**
     * Display a list of payrolls.
     */
    public function index()
    {
        $payrolls = Payroll::with('staffMember')->latest()->paginate(10);

        // Append staff member's name to each payroll entry
        $payrolls->getCollection()->transform(function ($payroll) {
            $payroll->staff_member_name = $payroll->staffMember ? $payroll->staffMember->name : 'N/A';
            return $payroll;
        });

        // dd($payrolls);

        return Inertia::render('HRM/PayrollManagement/Index', [
            'payrolls' => $payrolls,
        ]);
    }


    /**
     * Show the form to create payroll.
     */
    public function create()
    {
        // Get all staff members with the "name" accessor included
        $staffList = StaffMember::all()->append('name'); // Append the 'name' accessor

        return Inertia::render('HRM/PayrollManagement/Create', [
            'staffList' => $staffList,
        ]);
    }


    /**
     * Store a new payroll record.
     */
    public function store(Request $request)
    {
        $request->validate([
            'staff_member_id' => 'required|exists:staff_members,id',
            'salary' => 'required|numeric|min:0',
            'payment_date' => 'required|date',
            'status' => 'required|in:pending,paid',
        ]);

        Payroll::create($request->all());

        return redirect()->route('payroll.index')->with('success', 'Payroll record added successfully.');
    }

    /**
     * Show payroll details.
     */
    public function show(Payroll $payroll)
    {
        $payroll->load('staffMember');

        return Inertia::render('HRM/PayrollManagement/Show', [
            'payroll' => [
                'id' => $payroll->id,
                'staff_member_name' => optional($payroll->staffMember)->name ?? 'N/A', // Ensures no error if null
                'salary' => number_format($payroll->salary, 2), // Format salary as currency
                'payment_date' => $payroll->payment_date?->format('Y-m-d') ?? 'Not Set', // Format date
                'status' => ucfirst($payroll->status), // Capitalize status
                'created_at' => $payroll->created_at?->format('Y-m-d H:i:s'),
            ],
        ]);
    }


    /**
     * Show the form to edit payroll.
     */
    public function edit(Payroll $payroll)
    {
        $staffList = StaffMember::all();

        return Inertia::render('HRM/PayrollManagement/Edit', [
            'payroll' => $payroll,
            'staffList' => $staffList,
        ]);
    }

    /**
     * Update payroll record.
     */
    public function update(Request $request, Payroll $payroll)
    {
        $request->validate([
            'staff_id' => 'required|exists:staff,id',
            'salary' => 'required|numeric|min:0',
            'payment_date' => 'required|date',
            'status' => 'required|in:pending,paid',
        ]);

        $payroll->update($request->all());

        return redirect()->route('payroll.index')->with('success', 'Payroll record updated successfully.');
    }

    /**
     * Delete payroll record.
     */
    public function destroy(Payroll $payroll)
    {
        $payroll->delete();
        return redirect()->route('payroll.index')->with('success', 'Payroll record deleted successfully.');
    }
}
<?php

namespace App\Http\Controllers;

use App\Models\BloodGroup;
use App\Models\CommissionType;
use App\Models\Department;
use App\Models\Position;
use App\Models\Rank;
use App\Models\Religion;
use App\Models\StaffMember;
use App\Models\Unit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StaffController extends Controller
{
    public function index()
    {
        $staffs = StaffMember::with(['department', 'unit', 'rank', 'bloodGroup', 'religion'])->paginate(10);
        return Inertia::render('HRM/Staff/StaffDirectory', [
            'staffs' => $staffs,
        ]);
    }

    public function create()
    {
        return Inertia::render('HRM/Staff/CreateStaff', [
            'ranks' => Rank::all(),
            'departments' => Department::all(),
            'units' => Unit::all(),
            'bloodGroups' => BloodGroup::all(),
            'religions' => Religion::all(),
            'commissionTypes' =>  CommissionType::all(),
            'positions' =>  Position::all(),
        ]);
    }


    public function store(Request $request)
    {

        $validate = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string',
            'date_of_birth' => 'required|date',
            'place_of_birth' => 'required|string',
            'position' => 'required|string',
            'date_of_enlistment' => 'required|date',
            'rank_id' => 'required|exists:ranks,id',
            'blood_group_id' => 'required|exists:blood_groups,id',
            'department_id' => 'required|exists:departments,id',
            'religion_id' => 'required|exists:religions,id',
            'unit_id' => 'required|exists:units,id',
            'commission_type' => 'required|string',
            'contact_number' => 'required|string',
            'intake_name' => 'required|string',
            'email_address' => 'required|email',
            'gender' => 'required|string',
            'status' => 'required|string',
        ]);

        StaffMember::create($validate);

        return redirect()->route('staff.index');
    }


    public function edit($id)
    {
        $staff = StaffMember::with(['department', 'unit', 'rank', 'bloodGroup', 'religion'])->findOrFail($id);

        return Inertia::render('HRM/Staff/CreateStaff', [
            'staff' => $staff,
            'ranks' => Rank::all(),
            'departments' => Department::all(),
            'units' => Unit::all(),
            'bloodGroups' => BloodGroup::all(),
            'religions' => Religion::all(),
            'commissionTypes' =>  CommissionType::all(),
            'positions' =>  Position::all(),
        ]);
    }


    public function update(Request $request, StaffMember $staffMember)
    {

        $validate = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string',
            'date_of_birth' => 'required|date',
            'place_of_birth' => 'required|string',
            'position' => 'required|string',
            'date_of_enlistment' => 'required|date',
            'rank_id' => 'required|exists:ranks,id',
            'blood_group_id' => 'required|exists:blood_groups,id',
            'department_id' => 'required|exists:departments,id',
            'religion_id' => 'required|exists:religions,id',
            'unit_id' => 'required|exists:units,id',
            'commission_type' => 'required|string',
            'contact_number' => 'required|string',
            'intake_name' => 'required|string',
            'email_address' => 'required|email',
            'gender' => 'required|string',
            'status' => 'required|string',
        ]);

        // dd($validate);

        $staffMember->update($validate);

        return redirect()->route('staff.index');
    }


    public function show($id)
    {
        // Find the staff member by ID and load related models
        $staff = StaffMember::with(['department', 'unit', 'rank', 'bloodGroup', 'religion'])->findOrFail($id);

        // dd($staff);
        return Inertia::render('HRM/Staff/StaffProfile', [
            'staff' => $staff,
        ]);
    }


    public function destroy(StaffMember $staffMember)
    {
        // Find the staff member by ID and load related models
        $staffMember->delete();

        return redirect()->route('staff.index');
    }
}
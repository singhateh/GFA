<?php

namespace App\Http\Controllers;

use App\Models\Attendance;
use App\Models\StaffMember;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    // Display a listing of the attendance records
    public function index()
    {
        // Retrieve all attendance records (you can apply pagination or filters here)
        $attendanceRecords = Attendance::with(['staffMember'])->get();


        // dd($attendanceRecords);
        return Inertia::render('HRM/Attendances/AttendanceTracking', [
            'attendanceRecords' => $attendanceRecords
        ]);
    }

    // Show the form for creating a new attendance record
    public function create()
    {
        $staffLists = StaffMember::all();
        return Inertia::render('HRM/Attendances/CreateAttendance', ['staffLists' => $staffLists]);
    }

    // Store a newly created attendance record in storage
    public function store(Request $request)
    {
        // Validate input data
        $validated = $request->validate([
            'staff_member_id' => 'required|exists:staff_members,id',
            'date' => 'required|date',
            'check_in' => 'required|date_format:H:i',
            'check_out' => 'nullable|date_format:H:i', // optional check-out
        ]);

        // Create a new attendance record
        Attendance::create($validated);

        // Redirect back with a success message
        return redirect()->route('attendance.index')->with('success', 'Attendance record created successfully!');
    }

    // Display the specified attendance record
    public function show($id)
    {
        $attendance = Attendance::findOrFail($id);

        // Return the attendance details to an Inertia page
        return Inertia::render('Attendance/Show', [
            'attendance' => $attendance
        ]);
    }

    // Show the form for editing the specified attendance record
    public function edit($id)
    {
        $attendance = Attendance::findOrFail($id);

        // Return the attendance edit page with the existing attendance data
        return Inertia::render('Attendance/Edit', [
            'attendance' => $attendance
        ]);
    }

    // Update the specified attendance record in storage
    public function update(Request $request, $id)
    {
        // Validate input data
        $validated = $request->validate([
            'employee_name' => 'required|string|max:255',
            'date' => 'required|date',
            'check_in' => 'required|date_format:H:i',
            'check_out' => 'nullable|date_format:H:i', // optional check-out
        ]);

        // Find and update the attendance record
        $attendance = Attendance::findOrFail($id);
        $attendance->update($validated);

        // Redirect back with a success message
        return redirect()->route('attendance.index')->with('success', 'Attendance record updated successfully!');
    }

    // Remove the specified attendance record from storage
    public function destroy($id)
    {
        // Find the attendance record by ID and delete it
        $attendance = Attendance::findOrFail($id);
        $attendance->delete();

        // Return a JSON response for the frontend
        return response()->json(['message' => 'Attendance record deleted successfully']);
    }
}
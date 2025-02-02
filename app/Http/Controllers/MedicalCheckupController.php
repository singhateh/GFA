<?php

namespace App\Http\Controllers;

use App\Jobs\SendScheduleConfirmationEmail;
use App\Models\MedicalCheckup;
use App\Models\StaffMember;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;


class MedicalCheckupController extends Controller
{
    public function index(): Response
    {
        $medicalCheckups = MedicalCheckup::with(['staffMember', 'doctor'])->latest()->get();

        return Inertia::render('MRM/MedicalCheckups/Index', [
            'medicalCheckups' => $medicalCheckups,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('MRM/MedicalCheckups/Create', [
            'staffMembers' => StaffMember::get(),
            'doctors' => User::get(),
        ]);
    }

    public function store(Request $request)
    {
        // Validate the incoming request
        $validated =  $request->validate([
            'staff_member_id' => 'required|exists:staff_members,id',
            'doctor_id' => 'required|exists:users,id',
            'checkup_date' => 'required|date',
            'schedule_date' => 'nullable|date|date_format:Y-m-d H:i:s|after:checkup_date', // This is for datetime-local format validation
            'result' => 'required|string|max:255',
            'notes' => 'nullable|string',
            'follow_up_required' => 'boolean',
            'is_medical_cleared' => 'boolean',
        ]);


        // Create the checkup record in the database
        $checkup = MedicalCheckup::create($validated);

        // Dispatch the job to send the email at the scheduled date and time
        SendScheduleConfirmationEmail::dispatch($checkup)
            ->delay(Carbon::parse($checkup->checkup_date)); // Ensure this uses the correct schedule_date

        // Redirect with a success message
        return redirect()->route('medical-checkups.index')->with('success', 'Medical checkup recorded successfully.');
    }

    public function edit(MedicalCheckup $medicalCheckup): Response
    {
        return Inertia::render('MRM/MedicalCheckups/Create', [
            'medicalCheckup' => $medicalCheckup,
            'staffMembers' => StaffMember::get(),
            'doctors' => User::get(),
        ]);
    }



    public function update(Request $request, MedicalCheckup $medicalCheckup)
    {
        // Validate the incoming request
        $validated =  $request->validate([
            'staff_member_id' => 'required|exists:staff_members,id',
            'doctor_id' => 'required|exists:users,id',
            'checkup_date' => 'required|date',
            'schedule_date' => 'nullable|date|date_format:Y-m-d H:i:s|after:checkup_date', // Ensure valid datetime-local format
            'result' => 'required|string|max:255',
            'notes' => 'nullable|string',
            'follow_up_required' => 'boolean',
            'is_medical_cleared' => 'boolean',
        ]);

        // Update the medical checkup record
        $medicalCheckup->update($validated);

        SendScheduleConfirmationEmail::dispatch($medicalCheckup)
            ->delay(Carbon::parse($medicalCheckup->checkup_date)); // Ensure this uses the correct schedule_date

        // Redirect with a success message
        return redirect()->route('medical-checkups.index')->with('success', 'Medical checkup updated successfully.');
    }


    public function destroy(MedicalCheckup $medicalCheckup)
    {
        $medicalCheckup->delete();
        return redirect()->route('medical-checkups.index')->with('success', 'Medical checkup deleted successfully.');
    }

    public function reschedule(MedicalCheckup $medicalCheckup)
    {
        // Pass the checkup data to the React component via Inertia
        return Inertia::render('MRM/MedicalCheckups/Reschedule', [
            'checkup' => $medicalCheckup
        ]);
    }

    public function updateReschedule(Request $request, MedicalCheckup $medicalCheckup)
    {
        // Update the checkup with the new date
        $medicalCheckup->scheduled_at = $request->new_date;
        $medicalCheckup->save();

        // Optionally redirect or send a response back
        return redirect()->route('medicalcheckup.reschedule', ['checkup_id' => $medicalCheckup->id])
            ->with('status', 'Appointment rescheduled successfully.');
    }
}
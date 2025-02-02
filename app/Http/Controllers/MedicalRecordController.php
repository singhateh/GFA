<?php

namespace App\Http\Controllers;

use App\Models\MedicalRecord;
use App\Models\StaffMember;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MedicalRecordController extends Controller
{
    public function index(): Response
    {
        $medicalRecords = MedicalRecord::with(['staffMember', 'doctor'])->latest()->get();

        return Inertia::render('MRM/MedicalRecords/Index', [
            'medicalRecords' => $medicalRecords,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('MRM/MedicalRecords/Create', [
            'staffMembers' => StaffMember::get(),
            'doctors' => User::get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'staff_member_id' => 'required|exists:staff_members,id',
            'doctor_id' => 'required|exists:users,id',
            'medical_history' => 'nullable|string',
            'prescriptions' => 'nullable|string',
            'allergies' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        MedicalRecord::create($request->all());

        return redirect()->route('medical-records.index')->with('success', 'Medical record created successfully.');
    }

    public function edit(MedicalRecord $medicalRecord): Response
    {
        return Inertia::render('MRM/MedicalRecords/Create', [
            'medicalRecord' => $medicalRecord,
            'staffMembers' => StaffMember::get(),
            'doctors' => User::get(),
        ]);
    }

    public function update(Request $request, MedicalRecord $medicalRecord)
    {
        $request->validate([
            'staff_member_id' => 'required|exists:staff_members,id',
            'doctor_id' => 'required|exists:users,id',
            'medical_history' => 'nullable|string',
            'prescriptions' => 'nullable|string',
            'allergies' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        $medicalRecord->update($request->all());

        return redirect()->route('medical-records.index')->with('success', 'Medical record updated successfully.');
    }

    public function destroy(MedicalRecord $medicalRecord)
    {
        $medicalRecord->delete();
        return redirect()->route('medical-records.index')->with('success', 'Medical record deleted successfully.');
    }
}
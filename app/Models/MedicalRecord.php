<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedicalRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'staff_member_id',
        'doctor_id',
        'medical_history',
        'prescriptions',
        'allergies',
        'notes',
    ];

    public function staffMember()
    {
        return $this->belongsTo(StaffMember::class, 'staff_member_id');
    }

    public function doctor()
    {
        return $this->belongsTo(StaffMember::class, 'doctor_id');
    }
}
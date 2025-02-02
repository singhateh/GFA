<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MedicalCheckup extends Model
{
    use HasFactory;

    protected $fillable = [
        'staff_member_id',
        'doctor_id',
        'checkup_date',
        'schedule_date',
        'result',
        'notes',
        'follow_up_required',
        'is_medical_cleared'
    ];

    protected $casts = [
        'checkup_date' => "date:Y-m-d",
        'schedule_date' => "date:Y-m-d H:i:s",
    ];

    /**
     * Relationship with Staff Member (Assuming staff members are in `users` table).
     */
    public function staffMember()
    {
        return $this->belongsTo(StaffMember::class, 'staff_member_id');
    }

    /**
     * Relationship with Doctor (Assuming doctors are in `users` table).
     */
    public function doctor()
    {
        return $this->belongsTo(User::class, 'doctor_id');
    }
}
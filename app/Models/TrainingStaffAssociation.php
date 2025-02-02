<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrainingStaffAssociation extends Model
{
    use HasFactory;

    // Define the fillable fields
    protected $fillable = [
        'staff_member_id',
        'training_course_id',
        'status'
    ];

    // Define the inverse relationship with StaffMember
    public function staffMember()
    {
        return $this->belongsTo(StaffMember::class);
    }

    // Define the inverse relationship with TrainingCourse
    public function trainingCourse()
    {
        return $this->belongsTo(TrainingCourse::class);
    }
}
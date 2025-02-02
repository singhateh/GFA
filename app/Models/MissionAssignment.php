<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MissionAssignment extends Model
{
    use HasFactory;

    protected $fillable = [
        'staff_member_id',
        'mission_id',
        'role',
        'assignment_start_date',
        'assignment_end_date'
    ];

    public function mission()
    {
        return $this->belongsTo(Mission::class);
    }

    public function staffMember()
    {
        return $this->belongsTo(StaffMember::class);
    }
}
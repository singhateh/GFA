<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory;

    protected $fillable = [
        'staff_member_id',  // Changed from employee_name
        'date',
        'check_in',
        'check_out',
    ];

    protected $dates = [
        'date',
        'check_in',
        'check_out',
    ];

    // Relationship with the StaffMember model
    public function staffMember()
    {
        return $this->belongsTo(StaffMember::class);
    }
}
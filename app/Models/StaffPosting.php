<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StaffPosting extends Model
{
    use HasFactory;

    protected $primaryKey = 'posting_id';

    protected $fillable = [
        'staff_member_id',
        'department_id',
        'unit_id',
        'posting_date',
        'appointment',
    ];

    public function unit()
    {
        return $this->belongsTo(Unit::class, 'unit_id');
    }

    public function staffMember()
    {
        return $this->belongsTo(StaffMember::class, 'staff_member_id');
    }

    public function department()
    {
        return $this->belongsTo(Department::class, 'department_id');
    }
}
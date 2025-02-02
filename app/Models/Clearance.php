<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Clearance extends Model
{
    use HasFactory;

    protected $fillable = [
        'staff_member_id',
        'issued_at',
        'type',
        'status',
        'remarks',
    ];

    public function staffMember()
    {
        return $this->belongsTo(StaffMember::class);
    }
}
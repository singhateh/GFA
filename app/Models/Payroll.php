<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payroll extends Model
{
    use HasFactory;

    protected $fillable = [
        'staff_member_id',
        'salary',
        'payment_date',
        'status',
    ];

    protected $casts = [
        'payment_date' => 'date',
        'status' => 'boolean',
    ];

    public function staffMember()
    {
        return $this->belongsTo(StaffMember::class);
    }
}
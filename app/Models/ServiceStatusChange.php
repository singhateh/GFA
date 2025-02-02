<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceStatusChange extends Model
{
    use HasFactory;


    protected $fillable = [
        'staff_member_id',
        'status_description',
        'status_change_date',
        'remarks',
    ];

    public function staffMember()
    {
        return $this->belongsTo(StaffMember::class, 'staff_member_id');
    }
}
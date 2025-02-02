<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MissionSponsor extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'contact_info', 'remarks', 'status'];

    public function mission()
    {
        return $this->belongsTo(Mission::class);
    }
}
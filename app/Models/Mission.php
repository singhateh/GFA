<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mission extends Model
{
    use HasFactory;

    protected $fillable = [
        'mission_type_id',
        'name',
        'mission_sponsor_id',
        'start_date',
        'end_date',
        'country',
        'status'
    ];

    public function missionType()
    {
        return $this->belongsTo(MissionType::class, 'mission_type_id');
    }

    public function sponsor()
    {
        return $this->belongsTo(MissionSponsor::class, 'mission_sponsor_id');
    }
}
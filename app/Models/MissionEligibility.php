<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MissionEligibility extends Model
{
    use HasFactory;

    protected $table = 'mission_eligibilities'; // Explicitly define table name

    protected $fillable = [
        'description',
        'min_length_of_service',
        'min_gap_since_last_deployment',
    ];

    protected $casts = [
        'min_length_of_service' => 'integer',
        'min_gap_since_last_deployment' => 'integer',
    ];
}
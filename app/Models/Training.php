<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Training extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'training_type_id',
        'duration',
        'country_id',
        'start_date',
        'end_date',
        'certification',
        'remarks'
    ];

    public function trainingType()
    {
        return $this->belongsTo(TrainingType::class);
    }

    public function country()
    {
        return $this->belongsTo(Country::class);
    }
}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrainingPerformanceTracking extends Model
{
    use HasFactory;

    protected $fillable = [
        'training_staff_association_id',
        'progress_percentage',
        'status',
        'remarks'
    ];

    public function trainingStaffAssociation()
    {
        return $this->belongsTo(TrainingStaffAssociation::class);
    }

    public function staffMember()
    {
        return $this->trainingStaffAssociation->staffMember();
    }

    public function trainingCourse()
    {
        return $this->trainingStaffAssociation->trainingCourse();
    }
}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrainingCourse extends Model
{
    use HasFactory;

    // Define the fillable fields
    protected $fillable = [
        'name',         // Course name
        'description',  // Course description
        'type',         // Type (Civilian or Military)
        'status',         // Type (Active or Inactive)
    ];

    // Define the relationship with the TrainingStaffAssociation
    public function trainingStaffAssociations()
    {
        return $this->hasMany(TrainingStaffAssociation::class);
    }

    // Define the relationship with the StaffMembers through TrainingStaffAssociation
    public function staffMembers()
    {
        return $this->belongsToMany(StaffMember::class, 'training_staff_associations');
    }
}
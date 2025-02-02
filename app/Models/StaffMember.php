<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\SoftDeletes;

class StaffMember extends Model
{
    use HasFactory, SoftDeletes;

    protected $appends = ['name'];

    protected $fillable = [
        'army_number',
        'first_name',
        'last_name',
        'date_of_birth',
        'place_of_birth',
        'date_of_enlistment',
        'position',
        'rank_id',
        'blood_group_id',
        'department_id',
        'religion_id',
        'unit_id',
        'commission_type',
        'contact_number',
        'intake_name',
        'email_address',
        'gender',
        'status',
    ];

    /**
     * Accessor for full name (first_name + last_name)
     */
    protected function name(): Attribute
    {
        return Attribute::make(
            get: fn() => "{$this->first_name} {$this->last_name}"
        );
    }

    public function unit()
    {
        return $this->belongsTo(Unit::class);
    }

    public function rank()
    {
        return $this->belongsTo(Rank::class);
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function bloodGroup()
    {
        return $this->belongsTo(BloodGroup::class);
    }

    public function religion()
    {
        return $this->belongsTo(Religion::class);
    }

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }

    // Define the relationship with the TrainingStaffAssociation
    public function trainingStaffAssociations()
    {
        return $this->hasMany(TrainingStaffAssociation::class);
    }

    // Define the relationship with the TrainingCourses through TrainingStaffAssociation
    public function trainingCourses()
    {
        return $this->belongsToMany(TrainingCourse::class, 'training_staff_associations');
    }
}
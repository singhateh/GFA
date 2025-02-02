<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Unit extends Model
{
    use HasFactory;

    protected $fillable = [
        'unit_name',
        'location',
        'unit_type',
        'unit_description',
    ];

    public function staffMembers()
    {
        return $this->hasMany(StaffMember::class);
    }

    public function staffPostings()
    {
        return $this->hasMany(StaffPosting::class);
    }

    public function assignedAssets()
    {
        return $this->morphMany(AssetAssignment::class, 'assignedTo');
    }
}
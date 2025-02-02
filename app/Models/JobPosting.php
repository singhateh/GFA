<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobPosting extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'requirements', 'status', 'location'];

    // Define relationships (a job posting can have many applications)
    public function applications()
    {
        return $this->hasMany(JobApplication::class);
    }
}
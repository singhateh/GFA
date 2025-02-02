<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobApplication extends Model
{
    use HasFactory;

    protected $fillable = ['job_posting_id', 'candidate_name', 'email', 'resume', 'status'];

    // Define the relationship (an application belongs to a job posting)
    public function jobPosting()
    {
        return $this->belongsTo(JobPosting::class);
    }

    public function jobPostings()
    {
        return $this->hasMany(JobPosting::class, 'id', 'job_posting_id');
    }

    public function jobInterviews()
    {
        return $this->hasMany(Interview::class);
    }
}
<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Interview extends Model
{
    use HasFactory;

    protected $fillable = ['job_application_id', 'scheduled_at', 'interview_type', 'status'];

    // Define the relationship (an interview belongs to a job application)
    public function jobApplication()
    {
        return $this->belongsTo(JobApplication::class);
    }
}
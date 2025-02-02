<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rank extends Model
{
    use HasFactory;

    protected $fillable = [
        'rank_name',
        'rank_level',
    ];

    public function staff()
    {
        return $this->hasMany(StaffMember::class);
    }
}
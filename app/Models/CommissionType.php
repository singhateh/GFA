<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommissionType extends Model
{
    use HasFactory;

    protected $fillable = ['name']; // Fillable columns

    // Define the relationship with Rank (one-to-many)
    public function ranks()
    {
        return $this->hasMany(Rank::class);
    }
}
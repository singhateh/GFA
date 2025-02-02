<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssetAssignment extends Model
{
    use HasFactory;

    protected $fillable = [
        'asset_id',
        'assigned_to_id',
        'assigned_to_type',
        'quantity_assigned',
        'assigned_date',
        'return_date',
        'status',
        'remarks',
    ];

    protected $casts = [
        'assigned_date' => 'date:Y-m-d',
        'return_date' => 'date:Y-m-d',
    ];

    public function asset()
    {
        return $this->belongsTo(Asset::class);
    }

    public function assignedTo()
    {
        return $this->morphTo();
    }
}
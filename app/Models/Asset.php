<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asset extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'asset_type_id',
        'serial_no',
        'status',
        'condition',
        'quantity_in_stock',
        'quantity_in_use',
        'date_procured',
        'description',
    ];

    protected $casts = [
        'date_procured' => 'date:Y-m-d',
    ];

    public function assetType()
    {
        return $this->belongsTo(AssetType::class);
    }

    public function assignments()
    {
        return $this->hasMany(AssetAssignment::class);
    }
}
<?php

namespace Database\Seeders;

use App\Models\Position;
use Illuminate\Database\Seeder;

class PositionSeeder extends Seeder
{
    public function run()
    {
        Position::create(['name' => 'Manager']);
        Position::create(['name' => 'Developer']);
        Position::create(['name' => 'Designer']);
        Position::create(['name' => 'HR']);
        Position::create(['name' => 'Sales']);
        Position::create(['name' => 'Security']);
        Position::create(['name' => 'Trainer']);
    }
}
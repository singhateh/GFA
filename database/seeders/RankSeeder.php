<?php

namespace Database\Seeders;

use App\Models\Rank;
use Illuminate\Database\Seeder;

class RankSeeder extends Seeder
{
    public function run()
    {
        Rank::insert([
            ['rank_name' => 'Lieutenant', 'rank_level' => 'Officer'],
            ['rank_name' => 'Sergeant', 'rank_level' => 'SNCO'],
            ['rank_name' => 'Corporal', 'rank_level' => 'JNCO'],
            ['rank_name' => 'Captain', 'rank_level' => 'Officer'],
            ['rank_name' => 'Major', 'rank_level' => 'Officer'],
            ['rank_name' => 'Colonel', 'rank_level' => 'Officer'],
            ['rank_name' => 'Private', 'rank_level' => 'Soldier'],
            ['rank_name' => 'Private First Class', 'rank_level' => 'Soldier'],
            ['rank_name' => 'Warrant Officer', 'rank_level' => 'SNCO'],
            ['rank_name' => 'Sergeant Major', 'rank_level' => 'SNCO'],
            ['rank_name' => 'Brigadier General', 'rank_level' => 'Officer'],
            ['rank_name' => 'General', 'rank_level' => 'Officer'],
        ]);
    }
}
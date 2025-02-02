<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Country;

class CountrySeeder extends Seeder
{
    public function run()
    {
        $countries = [
            ['name' => 'The Gambia', 'code' => 'GM'],
            ['name' => 'United States', 'code' => 'US'],
            ['name' => 'United Kingdom', 'code' => 'GB'],
            ['name' => 'Nigeria', 'code' => 'NG'],
            ['name' => 'France', 'code' => 'FR'],
            ['name' => 'China', 'code' => 'CN'],
        ];

        foreach ($countries as $country) {
            Country::firstOrCreate($country);
        }
    }
}
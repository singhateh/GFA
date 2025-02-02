<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Asset;
use App\Models\AssetType; // Assuming AssetType model exists

class AssetSeeder extends Seeder
{
    public function run()
    {
        // Truncate the table before seeding
        Asset::truncate();

        // Get all asset types and pick a random one
        $assetTypes = AssetType::all();

        // Seed military assets with random asset_type_id and set quantity_in_use to 0
        Asset::insert([
            ['name' => 'M16 Rifle', 'asset_type_id' => $assetTypes->random()->id, 'serial_no' => 'M16-12345', 'status' => 'Available', 'condition' => 'New', 'quantity_in_stock' => 50, 'quantity_in_use' => 0, 'date_procured' => now(), 'description' => 'Standard issue assault rifle'],
            ['name' => 'AK-47', 'asset_type_id' => $assetTypes->random()->id, 'serial_no' => 'AK47-23456', 'status' => 'Assigned', 'condition' => 'Good', 'quantity_in_stock' => 30, 'quantity_in_use' => 0, 'date_procured' => now(), 'description' => 'Assault rifle for infantry'],
            ['name' => 'M9 Pistol', 'asset_type_id' => $assetTypes->random()->id, 'serial_no' => 'M9-34567', 'status' => 'Available', 'condition' => 'New', 'quantity_in_stock' => 100, 'quantity_in_use' => 0, 'date_procured' => now(), 'description' => 'Semi-automatic handgun'],
            ['name' => 'M1 Abrams Tank', 'asset_type_id' => $assetTypes->random()->id, 'serial_no' => 'M1-45678', 'status' => 'Maintenance', 'condition' => 'Fair', 'quantity_in_stock' => 5, 'quantity_in_use' => 0, 'date_procured' => now(), 'description' => 'Main battle tank'],
            ['name' => 'Humvee', 'asset_type_id' => $assetTypes->random()->id, 'serial_no' => 'HUMV-56789', 'status' => 'Assigned', 'condition' => 'Good', 'quantity_in_stock' => 10, 'quantity_in_use' => 0, 'date_procured' => now(), 'description' => 'High mobility multipurpose wheeled vehicle'],
            ['name' => 'Chinook Helicopter', 'asset_type_id' => $assetTypes->random()->id, 'serial_no' => 'CH-1234', 'status' => 'Available', 'condition' => 'Good', 'quantity_in_stock' => 3, 'quantity_in_use' => 0, 'date_procured' => now(), 'description' => 'Heavy-lift transport helicopter'],
            ['name' => 'Black Hawk Helicopter', 'asset_type_id' => $assetTypes->random()->id, 'serial_no' => 'BH-2345', 'status' => 'Assigned', 'condition' => 'Fair', 'quantity_in_stock' => 5, 'quantity_in_use' => 0, 'date_procured' => now(), 'description' => 'Multi-role helicopter for combat and transport'],
            ['name' => 'F-16 Fighter Jet', 'asset_type_id' => $assetTypes->random()->id, 'serial_no' => 'F16-3456', 'status' => 'Maintenance', 'condition' => 'Damaged', 'quantity_in_stock' => 2, 'quantity_in_use' => 0, 'date_procured' => now(), 'description' => 'Multi-role combat aircraft'],
            ['name' => 'C-130 Hercules', 'asset_type_id' => $assetTypes->random()->id, 'serial_no' => 'C130-4567', 'status' => 'Available', 'condition' => 'Good', 'quantity_in_stock' => 4, 'quantity_in_use' => 0, 'date_procured' => now(), 'description' => 'Tactical transport aircraft'],
            ['name' => 'Stryker Armored Vehicle', 'asset_type_id' => $assetTypes->random()->id, 'serial_no' => 'SAV-5678', 'status' => 'Available', 'condition' => 'New', 'quantity_in_stock' => 8, 'quantity_in_use' => 0, 'date_procured' => now(), 'description' => 'Wheeled armored vehicle for troop transport'],
            ['name' => 'M240 Machine Gun', 'asset_type_id' => $assetTypes->random()->id, 'serial_no' => 'M240-6789', 'status' => 'Assigned', 'condition' => 'Good', 'quantity_in_stock' => 25, 'quantity_in_use' => 0, 'date_procured' => now(), 'description' => 'Belt-fed machine gun'],
            ['name' => 'M249 SAW', 'asset_type_id' => $assetTypes->random()->id, 'serial_no' => 'M249-7890', 'status' => 'Available', 'condition' => 'New', 'quantity_in_stock' => 50, 'quantity_in_use' => 0, 'date_procured' => now(), 'description' => 'Squad automatic weapon'],
            ['name' => 'M203 Grenade Launcher', 'asset_type_id' => $assetTypes->random()->id, 'serial_no' => 'M203-8901', 'status' => 'Assigned', 'condition' => 'Fair', 'quantity_in_stock' => 30, 'quantity_in_use' => 0, 'date_procured' => now(), 'description' => '40mm grenade launcher for rifles'],
            ['name' => 'M2 Browning', 'asset_type_id' => $assetTypes->random()->id, 'serial_no' => 'M2B-9012', 'status' => 'Available', 'condition' => 'New', 'quantity_in_stock' => 10, 'quantity_in_use' => 0, 'date_procured' => now(), 'description' => 'Heavy machine gun'],
            ['name' => 'Glock 17', 'asset_type_id' => $assetTypes->random()->id, 'serial_no' => 'G17-1234', 'status' => 'Available', 'condition' => 'New', 'quantity_in_stock' => 40, 'quantity_in_use' => 0, 'date_procured' => now(), 'description' => 'Standard issue sidearm'],
            ['name' => 'Tactical Radio', 'asset_type_id' => $assetTypes->random()->id, 'serial_no' => 'TR-2345', 'status' => 'Available', 'condition' => 'New', 'quantity_in_stock' => 50, 'quantity_in_use' => 0, 'date_procured' => now(), 'description' => 'Portable communication radio'],
            ['name' => 'Night Vision Goggles', 'asset_type_id' => $assetTypes->random()->id, 'serial_no' => 'NVG-3456', 'status' => 'Assigned', 'condition' => 'Good', 'quantity_in_stock' => 15, 'quantity_in_use' => 0, 'date_procured' => now(), 'description' => 'Night vision equipment'],
            ['name' => 'Radar System', 'asset_type_id' => $assetTypes->random()->id, 'serial_no' => 'RS-4567', 'status' => 'Maintenance', 'condition' => 'Damaged', 'quantity_in_stock' => 2, 'quantity_in_use' => 0, 'date_procured' => now(), 'description' => 'Advanced radar for detecting enemy aircraft'],
            ['name' => 'Body Armor', 'asset_type_id' => $assetTypes->random()->id, 'serial_no' => 'BA-5678', 'status' => 'Available', 'condition' => 'New', 'quantity_in_stock' => 100, 'quantity_in_use' => 0, 'date_procured' => now(), 'description' => 'Standard issue bulletproof vest'],
        ]);
    }
}
<?php

use App\Console\Commands\MedicalCheckupReminder;
use Illuminate\Support\Facades\Schedule;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');



Schedule::call(function () {
    Artisan::call('medicalcheckup:reminder'); // Executes the reminder command
})->everyMinute();
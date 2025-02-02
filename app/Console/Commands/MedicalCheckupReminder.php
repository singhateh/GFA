<?php

namespace App\Console\Commands;

use App\Jobs\SendMedicalCheckupReminderEmail;
use App\Models\MedicalCheckup;
use Carbon\Carbon;
use Illuminate\Console\Command;

class MedicalCheckupReminder extends Command
{
    protected $signature = 'medicalcheckup:reminder';
    protected $description = 'Send reminder emails based on medical checkups schedule.';

    public function handle()
    {
        // Get all medical checkups scheduled for tomorrow
        $checkups = MedicalCheckup::whereDate('schedule_date', Carbon::tomorrow())->get();

        // Loop through each checkup and send reminders
        foreach ($checkups as $checkup) {
            // Dispatch the reminder job for each checkup
            SendMedicalCheckupReminderEmail::dispatch($checkup);
            $this->info("Reminder sent for checkup ID: {$checkup->id}");
        }
    }
}
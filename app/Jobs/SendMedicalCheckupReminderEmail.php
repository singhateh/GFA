<?php

namespace App\Jobs;

use App\Mail\ScheduleReminderMail;
use App\Models\MedicalCheckup;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendMedicalCheckupReminderEmail implements ShouldQueue
{
    use Queueable, SerializesModels, Dispatchable;

    protected $checkup;

    public function __construct(MedicalCheckup $checkup)
    {
        $this->checkup = $checkup;
    }

    public function handle()
    {
        // Format the schedule date
        $formattedScheduleDate = \Carbon\Carbon::parse($this->checkup->schedule_date)->format('l, F j, Y, g:i A');

        // Send the reminder email to the user
        Mail::to($this->checkup->staffMember->email_address)
            ->send(new ScheduleReminderMail($this->checkup, $formattedScheduleDate));
    }
}
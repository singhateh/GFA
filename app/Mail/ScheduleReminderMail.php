<?php

namespace App\Mail;

use App\Models\MedicalCheckup;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ScheduleReminderMail extends Mailable
{
    use Queueable, SerializesModels;

    public $checkup;
    public $formattedScheduleDate;

    public function __construct(MedicalCheckup $checkup, $formattedScheduleDate)
    {
        $this->checkup = $checkup;
        $this->formattedScheduleDate = $formattedScheduleDate;
    }

    public function build()
    {
        return $this->subject('Medical Checkup Reminder')
            ->view('emails.schedule_reminder') // Define the email view here
            ->with([
                'checkup' => $this->checkup,
                'schedule_date' => $this->formattedScheduleDate,
            ]);
    }
}
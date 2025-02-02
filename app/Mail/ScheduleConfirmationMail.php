<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ScheduleConfirmationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $staffMemberName;
    public $scheduleDate;
    public $checkUpDate;
    public $checkUp;

    public function __construct($scheduleDate, $checkUpDate, $staffMember, $checkUp)
    {
        $this->scheduleDate = $scheduleDate;
        $this->staffMemberName = $staffMember?->name;
        $this->checkUpDate = $checkUpDate;
        $this->checkUp = $checkUp;
    }

    public function build()
    {
        // Check if scheduleDate is present
        if (empty($this->scheduleDate)) {
            // If scheduleDate is empty, use the 'emails.schedule' view
            return $this->view('emails.checkup_confirmation')
                ->with([
                    'staffMemberName' => $this->staffMemberName,
                    'checkupDate' => $this->checkUpDate,
                ]);
        } else {
            // If scheduleDate is not empty, use the 'emails.schedule_confirmation' view
            return $this->view('emails.schedule_confirmation')
                ->with([
                    'scheduleDate' => $this->scheduleDate,
                    'staffMemberName' => $this->staffMemberName,
                ]);
        }
    }
}
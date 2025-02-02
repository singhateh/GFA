<?php

namespace App\Jobs;

use App\Mail\ScheduleConfirmationMail;
use App\Models\MedicalCheckup;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;
use Illuminate\Foundation\Bus\Dispatchable;

class SendScheduleConfirmationEmail implements ShouldQueue
{
    use Queueable, SerializesModels, Dispatchable;

    protected $checkup;

    /**
     * Create a new job instance.
     *
     * @param  \App\Models\MedicalCheckup  $checkup
     * @return void
     */
    public function __construct(MedicalCheckup $checkup)
    {
        $this->checkup = $checkup;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $formattedCheckupDate = Carbon::parse($this->checkup->checkup_date)?->format('l, F j, Y, g:i A');
        $formattedScheduleDate = Carbon::parse($this->checkup->schedule_date)?->format('l, F j, Y, g:i A');
        $staffMember = $this->checkup->staffMember;
        $checkup = $this->checkup;

        // CC and BCC recipients
        $ccRecipients = ['cc1@example.com', 'cc2@example.com'];
        $bccRecipients = ['bcc1@example.com', 'bcc2@example.com'];

        // Send the email to the user
        Mail::to($staffMember->email_address)
            ->cc($ccRecipients) // Adding CC recipients
            ->bcc($bccRecipients) // Adding BCC recipients
            ->send(new ScheduleConfirmationMail(
                $formattedScheduleDate,
                $formattedCheckupDate,
                $staffMember,
                $checkup
            ));
    }
}
<!-- resources/views/emails/schedule_reminder.blade.php -->

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Medical Checkup Reminder</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #e9f5f2;
        }

        .container {
            background-color: #ffffff;
            width: 100%;
            max-width: 650px;
            margin: 20px auto;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
            border: 1px solid #dcdcdc;
        }

        .header {
            background-color: #4caf50;
            color: white;
            padding: 15px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }

        .header h1 {
            margin: 0;
        }

        .content {
            margin-top: 20px;
            line-height: 1.6;
            font-size: 16px;
            color: #333;
        }

        .content p {
            margin-bottom: 10px;
        }

        .content strong {
            color: #2c3e50;
        }

        .footer {
            text-align: center;
            font-size: 14px;
            color: #7f8c8d;
            margin-top: 20px;
        }

        .footer a {
            color: #3498db;
            text-decoration: none;
        }

        .btn {
            display: inline-block;
            background-color: #3498db;
            color: white;
            font-size: 16px;
            padding: 12px 25px;
            text-align: center;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }

        .btn:hover {
            background-color: #2980b9;
        }

        .signature {
            font-size: 14px;
            color: #555;
            margin-top: 30px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>Medical Checkup Reminder</h1>
        </div>

        <div class="content">
            <p>Dear {{ $checkup->staffMember->name }},</p>

            <p>This is a reminder for your upcoming medical checkup scheduled for <strong>{{ $schedule_date }}</strong>.
            </p>

            <p>We recommend arriving 10 minutes early to complete any necessary paperwork or to address any concerns
                with the medical staff. Please make sure to bring any relevant health information with you to the
                appointment.</p>

            <p>If you need to reschedule or have any questions, feel free to contact your doctor.</p>

            <a href="{{ route('medicalcheckup.reschedule', $checkup) }}" class="btn">Reschedule
                Appointment</a>
        </div>

        <div class="footer">
            <p>If you have any questions or need assistance, please reach out to our clinic team at <a
                    href="mailto:clinic@example.com">clinic@example.com</a>.</p>
            <p>Best regards, <br> Your Clinic Team</p>
        </div>

        <div class="signature">
            <p><strong>Note:</strong> This is an automated message, please do not reply directly to this email.</p>
        </div>
    </div>
</body>

</html>

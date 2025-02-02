<!-- resources/views/emails/schedule_confirmation.blade.php -->

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Schedule Confirmation</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
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
            background-color: #2c3e50;
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
            <h1>Medical Checkup Scheduled</h1>
        </div>

        <div class="content">
            <p>Dear {{ $staffMemberName }},</p>

            <p>We are pleased to confirm that your medical checkup has been scheduled for
                <strong>{{ $scheduleDate }}</strong>.</p>

            <p>Thank you for choosing our services. Please arrive at least 10 minutes early to complete any necessary
                paperwork and to ensure that the appointment runs smoothly.</p>

            <p>If you need to make any changes to your appointment or have questions, don't hesitate to contact us.</p>
        </div>

        <div class="footer">
            <p>If you have any questions or need assistance, please contact our clinic at <a
                    href="mailto:clinic@example.com">clinic@example.com</a>.</p>
            <p>Best regards, <br> Your Clinic Team</p>
        </div>

        <div class="signature">
            <p><strong>Note:</strong> This is an automated message, please do not reply directly to this email.</p>
        </div>
    </div>
</body>

</html>

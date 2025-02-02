<?php

use App\Http\Controllers\AssetAssignmentController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


use App\Http\Controllers\StaffController;
use App\Http\Controllers\TrainingController;
use App\Http\Controllers\MedicalCheckupController;
use App\Http\Controllers\MissionController;
use App\Http\Controllers\ClearanceController;
use App\Http\Controllers\LeaveController;
use App\Http\Controllers\PayrollController;
use App\Http\Controllers\PerformanceController;
use App\Http\Controllers\RecruitmentController;

use App\Http\Controllers\AssetController;
use App\Http\Controllers\LogisticsController;
use App\Http\Controllers\WarehouseController;
use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\MaintenanceController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\AssetSettingController;
use App\Http\Controllers\CourseController;


use App\Http\Controllers\MedicalRecordController;
use App\Http\Controllers\HealthHistoryController;
use App\Http\Controllers\InterviewController;
use App\Http\Controllers\JobApplicationController;
use App\Http\Controllers\JobPostingController;
use App\Http\Controllers\MissionEligibilityController;
use App\Http\Controllers\MissionSponsorController;
use App\Http\Controllers\MissionTypeController;
use App\Http\Controllers\PeacekeepingController;
use App\Http\Controllers\TrainingProgramController;
use App\Http\Controllers\TrainingStaffAssociationController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');



    Route::get('/staff', [StaffController::class, 'index']);
    // Route::get('/trainings', [TrainingController::class, 'index']);
    Route::get('/medical-checkups', [MedicalCheckupController::class, 'index']);
    Route::get('/missions', [MissionController::class, 'index']);
    Route::get('/clearances', [ClearanceController::class, 'index']);
});



Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Route::get('/hr-management', function () {
    //     return Inertia::render('HRManagement');
    // })->name('hr-management');

    // Route::get('/asset-management', function () {
    //     return Inertia::render('AssetManagement');
    // })->name('asset-management');

    // Route::get('/training', function () {
    //     return Inertia::render('PersonnelTraining');
    // })->name('training');

    // Route::get('/medical', function () {
    //     return Inertia::render('MedicalRecords',);
    // })->name('medical');

    // Route::get('/peacekeeping', function () {
    //     return Inertia::render('PeacekeepingOperations');
    // })->name('peacekeeping');
});


Route::middleware(['auth'])->group(function () {
    Route::get('/hr-management', function () {
        return Inertia::render('HRManagement');
    })->name('hr-management');

    Route::get('/staff', [StaffController::class, 'index'])->name('staff.index');
    Route::get('/recruitment', [RecruitmentController::class, 'index'])->name('recruitment.index');
    Route::get('/performance/index', [PerformanceController::class, 'PerformanceIndex'])->name('performanceIndex.index');
    Route::get('/trainings', [TrainingController::class, 'index'])->name('trainings.index');
    Route::get('/leave', [LeaveController::class, 'index'])->name('leave.index');


    Route::prefix('staff')->group(function () {
        Route::get('/index', [StaffController::class, 'index'])->name('staff.index');
        Route::get('/create', [StaffController::class, 'create'])->name('staff.create');
        Route::post('/store', [StaffController::class, 'store'])->name('staff.store');
        Route::get('/{id}/profile', [StaffController::class, 'show'])->name('staff.show');
        Route::get('/{staffMember}/edit', [StaffController::class, 'edit'])->name('staff.edit');
        Route::put('/{staffMember}', [StaffController::class, 'update'])->name('staff.update');
        Route::delete('/{staffMember}', [StaffController::class, 'destroy'])->name('staff.destroy');
    });


    Route::prefix('attendance')->group(function () {
        Route::get('/', [AttendanceController::class, 'index'])->name('attendance.index');
        Route::get('/create', [AttendanceController::class, 'create'])->name('attendance.create');
        Route::post('/store', [AttendanceController::class, 'store'])->name('attendance.store');
        Route::get('/{id}/profile', [AttendanceController::class, 'show'])->name('attendance.show');
        Route::get('/{attendanceMember}/edit', [AttendanceController::class, 'edit'])->name('attendance.edit');
        Route::put('/{attendanceMember}', [AttendanceController::class, 'update'])->name('attendance.update');
        Route::delete('/{attendanceMember}', [AttendanceController::class, 'destroy'])->name('attendance.destroy');
    });


    Route::prefix('payroll')->group(function () {
        Route::get('/', [PayrollController::class, 'index'])->name('payroll.index');
        Route::get('/create', [PayrollController::class, 'create'])->name('payroll.create');
        Route::post('/store', [PayrollController::class, 'store'])->name('payroll.store');
        Route::get('/{payroll}/show', [PayrollController::class, 'show'])->name('payroll.show');
        Route::get('/{payroll}/edit', [PayrollController::class, 'edit'])->name('payroll.edit');
        Route::put('/{payroll}', [PayrollController::class, 'update'])->name('payroll.update');
        Route::delete('/{payroll}', [PayrollController::class, 'destroy'])->name('payroll.destroy');
    });


    Route::prefix('recruitment')->group(function () {
        Route::get('/', [RecruitmentController::class, 'index'])->name('recruitment.index');
        Route::get('/create', [RecruitmentController::class, 'create'])->name('recruitment.create');
        Route::post('/store', [RecruitmentController::class, 'store'])->name('recruitment.store');
        Route::get('/{recruitment}/show', [RecruitmentController::class, 'show'])->name('recruitment.show');
        Route::get('/{recruitment}/edit', [RecruitmentController::class, 'edit'])->name('recruitment.edit');
        Route::put('/{recruitment}', [RecruitmentController::class, 'update'])->name('recruitment.update');
        Route::delete('/{recruitment}', [RecruitmentController::class, 'destroy'])->name('recruitment.destroy');
    });

    Route::prefix('recruitment')->group(function () {
        // Job Postings Routes
        Route::get('job-postings', [JobPostingController::class, 'index'])->name('recruitment.jobPostings.index');
        Route::get('job-postings/create', [JobPostingController::class, 'create'])->name('recruitment.jobPostings.create');
        Route::post('job-postings', [JobPostingController::class, 'store'])->name('recruitment.jobPostings.store');
        Route::get('job-postings/{jobPosting}', [JobPostingController::class, 'show'])->name('recruitment.jobPostings.show');

        // Job Application Routes
        Route::get('job-postings/applications/index', [JobApplicationController::class, 'index'])->name('recruitment.jobApplications.index');
        Route::get('job-postings/{jobPosting}/apply', [JobApplicationController::class, 'create'])->name('recruitment.jobApplications.create');
        Route::post('job-postings/{jobPosting}/apply', [JobApplicationController::class, 'store'])->name('recruitment.jobApplications.store');
        Route::get('job-postings/applications/{jobApplication}', [JobApplicationController::class, 'show'])->name('recruitment.jobApplications.show');

        // Interview Routes
        Route::get('job-applications/', [InterviewController::class, 'index'])->name('recruitment.interviews.index');
        Route::get('job-applications/{jobApplication}/interview', [InterviewController::class, 'schedule'])->name('recruitment.interviews.schedule');
        Route::post('job-applications/{jobApplication}/interview', [InterviewController::class, 'store'])->name('recruitment.interviews.store');
        Route::delete('/job-applications/{interview}/delete', [InterviewController::class, 'destroy'])->name('recruitment.interviews.destroy');
    });
});


Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/asset-management', function () {
        return Inertia::render('AssetManagement');
    })->name('asset-management');

    Route::prefix('assets')->group(function () {
        Route::get('/', [AssetController::class, 'index'])->name('assets.index');
        Route::get('/create', [AssetController::class, 'create'])->name('assets.create');
        Route::post('/store', [AssetController::class, 'store'])->name('assets.store');
        Route::get('/{asset}', [AssetController::class, 'show'])->name('assets.show');
        Route::get('/{asset}/edit', [AssetController::class, 'edit'])->name('assets.edit');
        Route::put('/{asset}', [AssetController::class, 'update'])->name('assets.update');
        Route::delete('/{asset}', [AssetController::class, 'destroy'])->name('assets.destroy');
    });

    Route::prefix('assets/assignments')->group(function () {
        Route::get('/index', [AssetAssignmentController::class, 'index'])->name('assignments.index');
        Route::get('/create/{asset?}', [AssetAssignmentController::class, 'create'])->name('assignments.create');
        Route::post('/store', [AssetAssignmentController::class, 'store'])->name('assignments.store');
        Route::get('/{assetAssignment}', [AssetAssignmentController::class, 'show'])->name('assignments.show');
        Route::get('/{assetAssignment}/edit', [AssetAssignmentController::class, 'edit'])->name('assignments.edit');
        Route::put('/{assetAssignment}', [AssetAssignmentController::class, 'update'])->name('assignments.update');
        Route::delete('/{assetAssignment}', [AssetAssignmentController::class, 'destroy'])->name('assignments.destroy');
    });

    Route::prefix('logistics')->group(function () {
        Route::get('/', [LogisticsController::class, 'index'])->name('logistics.index');
    });

    Route::prefix('warehouses')->group(function () {
        Route::get('/', [WarehouseController::class, 'index'])->name('warehouses.index');
    });

    Route::prefix('maintenance')->group(function () {
        Route::get('/', [MaintenanceController::class, 'index'])->name('maintenance.index');
    });

    Route::prefix('reports')->group(function () {
        Route::get('/', [ReportController::class, 'index'])->name('reports.index');
    });

    Route::prefix('settings')->group(function () {
        Route::get('/', [AssetSettingController::class, 'index'])->name('settings.index');
    });
});



Route::middleware(['auth', 'verified'])->group(function () {

    Route::prefix('training')->group(function () {
        Route::get('/', function () {
            return Inertia::render('PersonnelTraining');
        })->name('training');
        Route::get('/index', [TrainingProgramController::class, 'index'])->name('training.index');
        Route::get('/create', [TrainingProgramController::class, 'create'])->name('training.create');
        Route::post('/store', [TrainingProgramController::class, 'store'])->name('training.store');
        Route::get('/{training}', [TrainingProgramController::class, 'show'])->name('training.show');
        Route::get('/{training}/edit', [TrainingProgramController::class, 'edit'])->name('training.edit');
        Route::put('/{training}', [TrainingProgramController::class, 'update'])->name('training.update');
        Route::delete('/{training}', [TrainingProgramController::class, 'destroy'])->name('training.destroy');
    });

    Route::prefix('courses')->group(function () {
        Route::get('/', function () {
            return Inertia::render('PersonnelTraining');
        })->name('courses');
        Route::get('/index', [CourseController::class, 'index'])->name('courses.index');
        Route::get('/create', [CourseController::class, 'create'])->name('courses.create');
        Route::post('/store', [CourseController::class, 'store'])->name('courses.store');
        Route::get('/{trainingCourse}', [CourseController::class, 'show'])->name('courses.show');
        Route::get('/{trainingCourse}/edit', [CourseController::class, 'edit'])->name('courses.edit');
        Route::put('/{trainingCourse}', [CourseController::class, 'update'])->name('courses.update');
        Route::delete('/{trainingCourse}', [CourseController::class, 'destroy'])->name('courses.destroy');
    });

    Route::prefix('staff-associations')->group(function () {
        Route::get('/', [TrainingStaffAssociationController::class, 'index'])->name('staff-associations.index');

        Route::get('/training-staff-associations/create', [TrainingStaffAssociationController::class, 'create'])->name('training.staff-associations.create');
        Route::post('/training-staff-associations', [TrainingStaffAssociationController::class, 'store'])->name('training.staff-associations.store');
        Route::get('/training-staff-associations/{trainingStaffAssociation}/edit', [TrainingStaffAssociationController::class, 'edit'])->name('training.staff-associations.edit');
        Route::put('/training-staff-associations/{trainingStaffAssociation}', [TrainingStaffAssociationController::class, 'update'])->name('training.staff-associations.update');
        Route::delete('/training-staff-associations/{trainingStaffAssociation}', [TrainingStaffAssociationController::class, 'destroy'])->name('training.staff-associations.destroy');
    });

    Route::prefix('performance')->group(function () {
        Route::get('/', [PerformanceController::class, 'index'])->name('performance.index');

        Route::get('/training-performance/create', [PerformanceController::class, 'create'])->name('training.performance.create');
        Route::post('/training-performance', [PerformanceController::class, 'store'])->name('training.performance.store');
        Route::get('/training-performance/{trainingPerformanceTracking}/edit', [PerformanceController::class, 'edit'])->name('training.performance.edit');
        Route::put('/training-performance/{trainingPerformanceTracking}', [PerformanceController::class, 'update'])->name('training.performance.update');
        Route::delete('/training-performance/{trainingPerformanceTracking}', [PerformanceController::class, 'destroy'])->name('training.performance.destroy');
    });
});



Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('medical-records')->group(function () {
        Route::get('/', function () {
            return Inertia::render('MedicalRecords',);
        })->name('medical');

        Route::get('/index', [MedicalRecordController::class, 'index'])->name('medical-records.index');
        Route::get('/create', [MedicalRecordController::class, 'create'])->name('medical-records.create');
        Route::post('/store', [MedicalRecordController::class, 'store'])->name('medical-records.store');
        Route::get('/{medicalRecord}', [MedicalRecordController::class, 'show'])->name('medical-records.show');
        Route::get('/{medicalRecord}/edit', [MedicalRecordController::class, 'edit'])->name('medical-records.edit');
        Route::put('/{medicalRecord}', [MedicalRecordController::class, 'update'])->name('medical-records.update');
        Route::delete('/{medicalRecord}', [MedicalRecordController::class, 'destroy'])->name('medical-records.destroy');
    });

    Route::prefix('checkups')->group(function () {

        Route::get('/', [MedicalCheckupController::class, 'index'])->name('checkups.index');

        Route::prefix('medical-checkups')->group(function () {
            Route::get('/index', [MedicalCheckupController::class, 'index'])->name('medical-checkups.index');
            Route::get('/create', [MedicalCheckupController::class, 'create'])->name('medical-checkups.create');
            Route::post('/store', [MedicalCheckupController::class, 'store'])->name('medical-checkups.store');
            Route::get('/{medicalCheckup}', [MedicalCheckupController::class, 'show'])->name('medical-checkups.show');
            Route::get('/{medicalCheckup}/edit', [MedicalCheckupController::class, 'edit'])->name('medical-checkups.edit');
            Route::put('/{medicalCheckup}', [MedicalCheckupController::class, 'update'])->name('medical-checkups.update');
            Route::delete('/{medicalCheckup}', [MedicalCheckupController::class, 'destroy'])->name('medical-checkups.destroy');

            Route::get('/reschedule/{medicalCheckup}', [MedicalCheckupController::class, 'reschedule'])
                ->name('medicalcheckup.reschedule');

            // In routes/web.php
            Route::post('reschedule/{medicalCheckup}', [MedicalCheckupController::class, 'updateReschedule'])
                ->name('medicalcheckup.reschedule');
        });
    });


    Route::prefix('clearances')->group(function () {
        Route::get('/', [ClearanceController::class, 'index'])->name('checkups.index');
        Route::get('/index', [ClearanceController::class, 'index'])->name('clearances.index');
        Route::get('/create', [ClearanceController::class, 'create'])->name('clearances.create');
        Route::get('/{clearance}/edit', [ClearanceController::class, 'edit'])->name('clearances.edit');
        Route::post('/store', [ClearanceController::class, 'store'])->name('clearances.store');
        Route::put('/{clearance}', [ClearanceController::class, 'update'])->name('clearances.update');
        Route::delete('/{clearance}', [ClearanceController::class, 'destroy'])->name('clearances.destroy');
    });


    Route::prefix('health-history')->group(function () {
        Route::get('/', [HealthHistoryController::class, 'index'])->name('health-history.index');
    });
});



Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('peacekeeping')->group(function () {

        Route::get('/', function () {
            return Inertia::render('PeacekeepingOperations');
        })->name('peacekeeping');

        Route::prefix('missions')->group(function () {
            Route::get('/', [PeacekeepingController::class, 'index'])->name('peacekeeping.index');
            Route::get('/index', [MissionController::class, 'index'])->name('missions.index');
            Route::get('/create', [MissionController::class, 'create'])->name('missions.create');
            Route::post('/store', [MissionController::class, 'store'])->name('missions.store');
            Route::get('/{mission}', [MissionController::class, 'show'])->name('missions.show');
            Route::get('/{mission}/edit', [MissionController::class, 'edit'])->name('missions.edit');
            Route::put('/{mission}', [MissionController::class, 'update'])->name('missions.update');
            Route::delete('/{mission}', [MissionController::class, 'destroy'])->name('missions.destroy');
        });

        Route::prefix('mission-types')->group(function () {
            Route::get('/', [MissionTypeController::class, 'index'])->name('mission_types.index');
            Route::get('/create', [MissionTypeController::class, 'create'])->name('mission_types.create');
            Route::post('/store', [MissionTypeController::class, 'store'])->name('mission_types.store');
            Route::get('/{missionType}', [MissionTypeController::class, 'show'])->name('mission_types.show');
            Route::get('/{missionType}/edit', [MissionTypeController::class, 'edit'])->name('mission_types.edit');
            Route::put('/{missionType}', [MissionTypeController::class, 'update'])->name('mission_types.update');
            Route::delete('/{missionType}/delete', [MissionTypeController::class, 'destroy'])->name('mission_types.destroy');
        });

        Route::prefix('mission-sponsors')->group(function () {
            Route::get('/', [MissionSponsorController::class, 'index'])->name('mission_sponsors.index');
            Route::get('/create', [MissionSponsorController::class, 'create'])->name('mission_sponsors.create');
            Route::post('/store', [MissionSponsorController::class, 'store'])->name('mission_sponsors.store');
            Route::get('/{missionSponsor}', [MissionSponsorController::class, 'show'])->name('mission_sponsors.show');
            Route::get('/{missionSponsor}/edit', [MissionSponsorController::class, 'edit'])->name('mission_sponsors.edit');
            Route::put('/{missionSponsor}', [MissionSponsorController::class, 'update'])->name('mission_sponsors.update');
            Route::delete('/{missionSponsor}', [MissionSponsorController::class, 'destroy'])->name('mission_sponsors.destroy');
        });

        Route::prefix('mission-eligibility')->group(function () {
            Route::get('/', [MissionEligibilityController::class, 'index'])->name('mission_eligibility.index');
            Route::get('/create', [MissionEligibilityController::class, 'create'])->name('mission_eligibility.create');
            Route::post('/store', [MissionEligibilityController::class, 'store'])->name('mission_eligibility.store');
            Route::get('/{missionEligibility}', [MissionEligibilityController::class, 'show'])->name('mission_eligibility.show');
            Route::get('/{missionEligibility}/edit', [MissionEligibilityController::class, 'edit'])->name('mission_eligibility.edit');
            Route::put('/{missionEligibility}', [MissionEligibilityController::class, 'update'])->name('mission_eligibility.update');
            Route::delete('/{missionEligibility}', [MissionEligibilityController::class, 'destroy'])->name('mission_eligibility.destroy');

            Route::get('/scan-eligible-staff/{missionEligibility}', [MissionEligibilityController::class, 'ScanEligibleStaff'])->name('mission_eligibility.scan');
            Route::get('/eligible-staff/info/{missionEligibility}', [MissionEligibilityController::class, 'ScanEligibleStaffInfo'])->name('mission_eligibility_info.scan');
        });
    });
});



require __DIR__ . '/auth.php';
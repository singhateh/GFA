import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import axios from 'axios';

const ScanEligibleStaff = ({ mission }) => {
    const [staffList, setStaffList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [scanOption, setScanOption] = useState('individual'); // Default to individual scan
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [departments, setDepartments] = useState([]);
    const [getAllEligibleStaff, setGetAllEligibleStaff] = useState(false);

    useEffect(() => {
        if (!mission) return; // Ensure mission is defined

        fetchEligibleStaff();
    }, [mission]);

    const fetchEligibleStaff = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/peacekeeping/mission-eligibility/eligible-staff/info/${mission}`, {
                params: {
                    department_id: selectedDepartment,  // Pass department_id if it's selected
                }
            });

            const eligibleStaffData = response.data?.eligibleStaff || [];

            if (getAllEligibleStaff) {
                setStaffList(eligibleStaffData);
            }

            // Extract unique departments by their id, name, and code
            const uniqueDepartments = [
                ...new Map(
                    eligibleStaffData.map(staff => [
                        `${staff?.department?.id}-${staff?.department?.name}-${staff?.department?.code}`,
                        {
                            id: staff?.department?.id,
                            name: staff?.department?.name,
                            code: staff?.department?.code
                        }
                    ])
                ).values(),
            ];

            if (selectedDepartment === '') {
                setDepartments(uniqueDepartments);
            }

        } catch (error) {
            console.error("Error fetching eligible staff:", error);
        } finally {
            setLoading(false);
        }
    };


    // Function to handle scanning based on selected option
    const handleScanStaff = (staffId) => {
        Inertia.post(`/scan-staff/${staffId}`, {
            mission: mission,
        });
    };

    // Function to scan all eligible staff
    const handleScanAll = () => {
        setGetAllEligibleStaff(true);
        fetchEligibleStaff();
    };

    // Function to scan based on selected department
    const handleScanByDepartment = () => {
        fetchEligibleStaff();

    };


    const handleChange = (e) => {
        setScanOption(e.target.value);
        setStaffList([]);
    };


    return (
        <AuthenticatedLayout>
            <Head title={`Eligible Staff for Mission #${mission}`} />
            <div className="p-6 max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Eligible Staff for Mission #{mission}</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            Manage medical mission eligibilities for staff.
                        </p>
                    </div>
                    <Link
                        href={route('mission_eligibility.index')} // Adjust route as necessary
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors"
                    >
                        ← Back to Mission Eligibility
                    </Link>
                </div>

                {/* Scanning Options */}
                <div className="mb-6">
                    <label htmlFor="scanOption" className="block text-lg text-gray-700 dark:text-gray-300 mb-2">Select Scan Option:</label>
                    <select
                        id="scanOption"
                        value={scanOption}
                        onChange={handleChange}
                        className="w-full p-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                    >
                        <option value="individual">Individually</option>
                        <option value="all">All</option>
                        <option value="department">By Department</option>
                    </select>
                </div>

                {/* Department Filter if 'By Department' is selected */}
                {scanOption === 'department' && (
                    <div className="mb-6">
                        <label htmlFor="department" className="block text-lg text-gray-700 dark:text-gray-300 mb-2">Select Department:</label>
                        <select
                            id="department"
                            value={selectedDepartment}
                            onChange={(e) => setSelectedDepartment(e.target.value)}
                            className="w-full p-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        >
                            <option value="">Select Department</option>
                            {departments.map((department, index) => (
                                <option key={department.id || index} value={department.id}>
                                    {department.name}
                                </option>
                            ))}

                        </select>
                    </div>
                )}

                {/* Display staff list */}
                {loading ? (
                    <div className="text-center text-lg text-gray-600 dark:text-gray-300">Loading...</div>
                ) : (
                    <div>
                        <ul>
                            {staffList.length === 0 ? (
                                <li className="text-center text-lg text-gray-600 dark:text-gray-300">
                                    No eligible staff found for this mission.
                                </li>
                            ) : (
                                // Render staff list based on department selection
                                (scanOption !== "department" || selectedDepartment) &&
                                staffList.filter(staff =>
                                    scanOption !== "department" || staff?.department?.id == selectedDepartment
                                ).map((staff) => (
                                    <li
                                        key={staff.id}
                                        className="flex justify-between items-center p-3 mb-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg shadow-sm"
                                    >
                                        <div>
                                            <p>
                                                {staff.name}{" "} <strong>{staff.army_number}</strong>{" "}
                                                <span className="text-gray-500 dark:text-gray-400">
                                                    ({staff.department?.name || "Unknown"})
                                                </span>
                                            </p>
                                        </div>
                                        {scanOption === "individual" && (
                                            <button
                                                onClick={() => handleScanStaff(staff.id)}
                                                className="ml-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none transition-colors"
                                            >
                                                Scan
                                            </button>
                                        )}
                                    </li>
                                ))
                            )}
                        </ul>

                        {/* Scan all button when the option is 'All' */}
                        {scanOption === 'all' && (
                            <div className="mt-4 flex justify-center">
                                <button
                                    onClick={handleScanAll}
                                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none transition-colors"
                                >
                                    Scan All Staff
                                </button>
                            </div>
                        )}

                        {/* Scan by department button when the option is 'By Department' */}
                        {scanOption === 'department' && selectedDepartment && (
                            <div className="mt-4 flex justify-center">
                                <button
                                    onClick={handleScanByDepartment}
                                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none transition-colors"
                                >
                                    Scan Staff in Department
                                </button>
                            </div>
                        )}
                    </div>
                )}

            </div>
        </AuthenticatedLayout>
    );
};

export default ScanEligibleStaff;

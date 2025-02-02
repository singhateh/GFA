import React from "react";
import { useForm, usePage } from "@inertiajs/react";

export default function Edit() {
    const { payroll, staffList } = usePage().props;
    const { data, setData, put, errors } = useForm({
        staff_id: payroll.staff_id,
        salary: payroll.salary,
        payment_date: payroll.payment_date,
        status: payroll.status,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/payroll/${payroll.id}`);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-4">Edit Payroll</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block">Staff</label>
                    <select
                        value={data.staff_id}
                        onChange={(e) => setData("staff_id", e.target.value)}
                        className="border p-2 w-full"
                    >
                        {staffList.map((staff) => (
                            <option key={staff.id} value={staff.id}>
                                {staff.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block">Salary</label>
                    <input
                        type="number"
                        value={data.salary}
                        onChange={(e) => setData("salary", e.target.value)}
                        className="border p-2 w-full"
                    />
                </div>

                <div>
                    <label className="block">Payment Date</label>
                    <input
                        type="date"
                        value={data.payment_date}
                        onChange={(e) => setData("payment_date", e.target.value)}
                        className="border p-2 w-full"
                    />
                </div>

                <div>
                    <label className="block">Status</label>
                    <select
                        value={data.status}
                        onChange={(e) => setData("status", e.target.value)}
                        className="border p-2 w-full"
                    >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                    </select>
                </div>

                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                    Update Payroll
                </button>
            </form>
        </div>
    );
}

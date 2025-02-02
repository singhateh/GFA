import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const Reschedule = ({ checkup }) => {
    const [newDate, setNewDate] = useState('');

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Submit the new date to the backend (you might want to create a route for this action)
        Inertia.post(route('medicalcheckup.reschedule', { checkup_id: checkup.id }), {
            new_date: newDate,
        });
    };

    return (
        <div className="container">
            <h1>Reschedule Appointment</h1>
            <p>Current appointment date: {checkup.scheduled_at}</p>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="new_date">New Appointment Date</label>
                    <input
                        type="date"
                        id="new_date"
                        name="new_date"
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Reschedule</button>
            </form>
        </div>
    );
};

export default Reschedule;

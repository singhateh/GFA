import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StaffOverview = () => {
    const [staff, setStaff] = useState([]);

    useEffect(() => {
        axios.get('/api/staff') // Ensure this API route exists in Laravel
            .then(response => setStaff(response.data.staff))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <ul>
                {staff.map(s => (
                    <li key={s.id}>{s.name} - {s.position}</li>
                ))}
            </ul>
        </div>
    );
};

export default StaffOverview;

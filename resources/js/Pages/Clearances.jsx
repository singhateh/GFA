import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const Clearances = () => {
    const [clearances, setClearances] = useState([]);

    useEffect(() => {
        Inertia.get('/api/clearances')
            .then(response => setClearances(response.props.clearances))
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <ul>
                {clearances.map(clearance => (
                    <li key={clearance.id}>{clearance.staff_name} - {clearance.status}</li>
                ))}
            </ul>
        </div>
    );
};

export default Clearances;

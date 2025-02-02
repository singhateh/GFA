import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const MedicalCheckups = () => {
    const [checkups, setCheckups] = useState([]);

    useEffect(() => {
        Inertia.get('/api/medical-checkups')
            .then(response => setCheckups(response.props.checkups))
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <ul>
                {checkups.map(checkup => (
                    <li key={checkup.id}>{checkup.result} - {checkup.staff_name}</li>
                ))}
            </ul>
        </div>
    );
};

export default MedicalCheckups;

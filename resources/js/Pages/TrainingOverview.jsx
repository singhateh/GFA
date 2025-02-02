import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const TrainingOverview = () => {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        Inertia.get('/api/trainings')
            .then(response => setTrainings(response.props.trainings))
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <ul>
                {trainings.map(t => (
                    <li key={t.id}>{t.name} - {t.description}</li>
                ))}
            </ul>
        </div>
    );
};

export default TrainingOverview;

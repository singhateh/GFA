import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const Missions = () => {
    const [missions, setMissions] = useState([]);

    useEffect(() => {
        Inertia.get('/api/missions')
            .then(response => setMissions(response.props.missions))
            .catch(err => console.log(err));
    }, []);

    return (
        <div>
            <ul>
                {missions.map(mission => (
                    <li key={mission.id}>{mission.name} - {mission.mission_type_name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Missions;

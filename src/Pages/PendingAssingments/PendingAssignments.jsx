import { useEffect, useState } from 'react';
import PendingSingleData from './PendingSingleData/PendingSingleData';

const PendingAssignments = () => {

    const [pendingData, setPendingData] = useState([]);
    const [pendingAssignments, setPendingAssignments] = useState([]);
    const url = `https://assignment-11-server-xi-flame.vercel.app/assignments`;
    
    useEffect(() => {
        fetch(url)
        .then(res => res.json())
        .then(data => setPendingAssignments(data))
    }, []);
    

    console.log(pendingAssignments);

    return (
        <div>
            <h1 className="text-3xl text-center font-bold mb-10">My Assignments </h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Title</th>
                            <th>Obtained Marks</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
    pendingAssignments.map(assignment => (
        assignment.marks === "" ?
        <PendingSingleData key={assignment._id} assignment={assignment} /> :
        null
    ))
}


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PendingAssignments;

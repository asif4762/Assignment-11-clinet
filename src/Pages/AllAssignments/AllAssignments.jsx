import React, { useEffect, useState } from 'react';

const AllAssignments = () => {

    const [data, setData] = useState(null);

    const url = `http://localhost:5500/difficulty-assignments?difficulty_level=Medium`;
    const url_1 = `http://localhost:5500/assignments`;

    useEffect(() =>{
        fetch(url_1)
        .then(res => res.json())
        .then(data => setData(data))
    }, [])

    console.log(data)

    const handleEasy = (t) => {
        setData(null);
            fetch(`http://localhost:5500/difficulty-assignments?difficulty_level=${t}`)
            .then(res => res.json())
            .then(data => setData(data))
    }

    return (
        <div>
            <h1>All Data : {data?.length}</h1>
            <button className='btn'>All Data</button>
            <button onClick={() => handleEasy("Easy")} className='btn'>Easy</button>
            <button onClick={() => handleEasy("Medium")} className='btn'>Medium</button>
            <button onClick={() => handleEasy("Hard")} className='btn'>Hard</button>
        </div>
    );
};

export default AllAssignments;
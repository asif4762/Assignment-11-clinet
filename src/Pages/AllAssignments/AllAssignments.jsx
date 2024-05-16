import React, { useEffect, useState } from 'react';
import Cards from '../../Components/Cards/Cards';
import Swal from 'sweetalert2';

const AllAssignments = () => {

    const [UserData, setUserData] = useState(null);

    const url = `http://localhost:5500/difficulty-assignments?difficulty_level=Medium`;
    const url_1 = `http://localhost:5500/assignments`;

    useEffect(() =>{
        fetch(url_1)
        .then(res => res.json())
        .then(data => setUserData(data))
    }, [])

    const AllAssignments = () =>{
        setUserData(null);
        fetch(url_1)
       .then(res => res.json())
       .then(data => setUserData(data))
    }

    console.log(UserData);

    const handleEasy = (t) => {
        setUserData(null);
        fetch(`http://localhost:5500/difficulty-assignments?difficulty_level=${t}`)
        .then(res => res.json())
        .then(data => setUserData(data))
    }

    

    return (
        <div>
        <div className="dropdown dropdown-hover flex justify-center items-center mb-20">
  <div tabIndex={0} role="button" className="btn m-1">Select Difficulty</div>
  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
    <li><button onClick={AllAssignments} className='btn'>All Data</button></li>
    <li><button onClick={() => handleEasy("Easy")} className='btn'>Easy</button></li>
    <li><button onClick={() => handleEasy("Medium")} className='btn'>Medium</button></li>
    <li><button onClick={() => handleEasy("Hard")} className='btn'>Hard</button></li>
  </ul>
</div>      
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {
                UserData?.map(data => <Cards key={data._id} data={data}></Cards>)
            }
            </div>
        </div>
    );
};

export default AllAssignments;

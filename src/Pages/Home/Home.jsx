import { useEffect, useState } from 'react';
import Banner from '../../Components/Banner/Banner';
import Fnq from '../../Components/Fnq/Fnq';
import Cards from '../../Components/Cards/Cards';

const Home = () => {

    const [data, setData] = useState([]); // State variable to hold the fetched FAQs

    useEffect(() => {
        // Fetch fake data when the component mounts
        fetch('http://localhost:5500/assignments')
        .then(res => res.json())
        .then(data => setData(data)) // Update the state with the fetched FAQs
        .catch(error => console.error('Error fetching data:', error));
    }, []); 

    return (
        <div>
        <Banner></Banner>
        <h1 className='text-center text-3xl font-bold mt-11'>Features</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8'>
            {
                data.map(data=> <Cards key={data._id} data={data}></Cards>)
            }
            </div>
            <h2 className='text-3xl text-center mt-7 font-bold'>Frequently asked questions</h2>
            <Fnq></Fnq>
        </div>
    );
};

export default Home;
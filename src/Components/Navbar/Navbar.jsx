import { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../Firebase/Provider/AuthProvider';
import Swal from 'sweetalert2';

const Navbar = () => {
    const [theme, setTheme] = useState('light');
    const [data, setData] = useState([]);
    const { user, logOut } = useContext(AuthContext);

    useEffect(() => {
        localStorage.setItem('theme', theme);
        const localTheme = localStorage.getItem('theme');
        document.querySelector('html').setAttribute('data-theme', localTheme);
    }, [theme])

    const handleToggle = (e) =>{
        if(e.target.checked){
            setTheme("dark");
        }
        else{
            setTheme("light");
        }
    }

    const url = `http://localhost:5500/my-assignments?email=${user?.email}`;

    useEffect(() => {
        fetch(url,{
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => setData(data));
    }, [user]);

    const handleLogout = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "You Logged out successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Something went wrong",
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    }

    return (
        <div className='h-28 mb-4'>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><NavLink to='/'>Home</NavLink></li>
                            <li><NavLink to='/create-assignments'>Create Assignments</NavLink></li>
                            <li><NavLink to='/my-assignments'>My Assignments</NavLink></li>
                            <li><NavLink to='/pending-assignments'>Pending Assignments</NavLink></li>
                            <li><NavLink to='/all-assignments'>All Assignments</NavLink></li>
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl"><img className='w-20 rounded-full' src="https://images-platform.99static.com//ZiLDklPa3LRxVtAqwRNKM6KENr4=/347x0:1034x686/fit-in/500x500/99designs-contests-attachments/75/75199/attachment_75199333" alt="" /></a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><NavLink to='/'>Home</NavLink></li>
                        <li><NavLink to='/create-assignments'>Create Assignments</NavLink></li>
                        <li><NavLink to='/my-assignments'>My Assignments</NavLink></li>
                        <li><NavLink to='/pending-assignments'>Pending Assignments</NavLink></li>
                        <li><NavLink to='/all-assignments'>All Assignments</NavLink></li>
                    </ul>
                </div>

                <div className="navbar-end">
                <label className="flex cursor-pointer gap-2">
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
  <input onChange={handleToggle} type="checkbox" value="dark" className="toggle theme-controller"/>
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
</label>
                    {
                        user ? <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
                                </div>
                            </div>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                <li>
                                    <a className="justify-between">
                                        {user.displayName || "user name not found"}
                                    </a>
                                </li>
                                <div className='flex flex-col gap-3'>
                                {
    Array.isArray(data) && data.map(dat => (
        <Link to={`/assignments/${dat._id}`} key={dat._id}>
            <button className='btn'>{dat.title.slice(0, 10)}</button>
        </Link>
    ))
}

                                </div>
                                <li><Link to='update-profile'>Update Profile</Link></li>
                                <li><button onClick={handleLogout} className=''>Logout</button></li>
                            </ul>
                        </div> : <div><Link to={`/login`}><button className="btn">Login</button></Link></div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;

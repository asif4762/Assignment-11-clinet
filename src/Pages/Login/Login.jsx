import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Firebase/Provider/AuthProvider';
import Swal from 'sweetalert2';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || '/';
    const {signIn, googleLogin} = useContext(AuthContext);

    const handleGoogleLogin = async () => {
      try {
          const result = await googleLogin();
          const { data } = await axios.post('https://assignment-11-server-xi-flame.vercel.app/jwt', {
              email: result?.user.email,
          }, {withCredentials: true});
          console.log(data);
          Swal.fire({
              position: "center",
              icon: "success",
              title: "Logged in successfully",
              showConfirmButton: false,
              timer: 1500
          });
          navigate(from, { replace: true });
      } catch (error) {
          console.error("Google login error:", error);
          Swal.fire({
              position: "center",
              icon: "error",
              title: "Something went wrong",
              showConfirmButton: false,
              timer: 1500
          });
      }
  };
  

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const info = { email, password };
    console.log(info);

    try {
        const result = await signIn(email, password);
        const user = result.user;
        if (user.email) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Logged in successfully",
                showConfirmButton: false,
                timer: 1500
            });
        }

        const { data } = await axios.post('https://assignment-11-server-xi-flame.vercel.app/jwt', {
            email: user.email,
        }, { withCredentials: true });

        console.log(data);
        navigate(from, { replace: true });
    } catch (error) {
        console.error('Login error:', error);
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Something went wrong",
            showConfirmButton: false,
            timer: 1500
        });
    }
};


    return (
        <div className="hero min-h-screen rounded-full bg-blue-100 mb-10">
  <div className="hero-content flex-col w-full">
  <h1 className='text-3xl font-bold'>Login</h1>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-blue-50">
      <form onSubmit={handleLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name='password' placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
            <Link to='/register' className="label-text-alt link link-hover">create an account</Link>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
      <div className="divider">OR</div>
      <div className='mx-auto w-[90%] mb-5'>
        <button onClick={handleGoogleLogin} className='btn w-full px-10 btn-secondary'>Google</button>
      </div>
    </div>
  </div>
</div>
    );
};

export default Login;
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Firebase/Provider/AuthProvider";
import Swal from "sweetalert2";


const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || '/';

    const {createUser} = useContext(AuthContext);

    const handleRegister = e =>{
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        createUser(email, password)
        .then(result => {
           Swal.fire({
                position: "center",
                icon: "success",
                title: "Your account has been created successfully",
                showConfirmButton: false,
                timer: 1500
              });
              navigate(from, {replace: true});
        })
        .catch(error => {
           Swal.fire({
                position: "center",
                icon: "error",
                title: "Something went wrong",
                showConfirmButton: false,
                timer: 1500
              });
              navigate(from, {replace: true});
        })
    } 

    return (
        <div className="hero min-h-screen rounded-full bg-blue-100 mb-10">
  <div className="hero-content flex-col w-full">
  <h1 className='text-3xl font-bold'>Register</h1>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-blue-50">
      <form onSubmit={handleRegister} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" name="name" placeholder="Name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name="password" placeholder="password" className="input input-bordered" required />
          <label className="label">
            <Link to='/login' className="label-text-alt link link-hover">Already have an account</Link>
          </label>
        </div>
        <div className="form-control mt-6">
          <input className="btn btn-primary" type="submit" value="Login" />
        </div>
      </form>
    </div>
  </div>
</div>
    );
};

export default Register;
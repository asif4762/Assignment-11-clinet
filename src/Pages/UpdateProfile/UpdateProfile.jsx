import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Firebase/Provider/AuthProvider";

const UpdateProfile = () => {

    const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const from = "/";

  const {user, updateUserProfile} = useContext(AuthContext);

  const [updateFlag, setUpdateFlag] = useState(false); 

  useEffect(() => {
    if (user) {
      setValue("fullName", user.fullName);
      setValue("photoUrl", user.photoUrl);
    }
  }, [user, setValue]);

  const onSubmit = (data) => {
    const { photoUrl, fullName } = data;
    updateUserProfile(fullName, photoUrl)
      .then(() => {
        setUpdateFlag((prev) => !prev);
        navigate(from);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

    return (
        <div className="min-h-screen rounded-xl bg-gray-100 animate__animated animate__backInUp">
      <div className="hero-content flex-col mt-10 lg:flex-row-reverse animate__animated animate__backInUp">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-transparent">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="Full Name"
                className="input input-bordered"
                {...register("fullName", { required: true })}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Photo URL</span>
              </label>
              <input
                type="text"
                placeholder="Photo URL"
                className="input input-bordered"
                {...register("photoUrl", { required: true })}
              />
            </div>
            <div className="form-control mt-6">
              <button onClick={updateUserProfile} type="submit" className="btn btn-primary">
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    );
};

export default UpdateProfile;
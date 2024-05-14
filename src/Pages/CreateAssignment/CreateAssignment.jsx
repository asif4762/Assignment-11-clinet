import { useContext } from "react";
import { AuthContext } from "../../Firebase/Provider/AuthProvider";
import Swal from "sweetalert2";


const CreateAssignment = () => {

    const {user} = useContext(AuthContext);

    const handleCreateAssignment = e => {

        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const difficulty = form.difficulty.value;
        const thumbnail = form.thumbnail.value;
        const description = form.description.value;

        const info = {
            title: title,
            difficulty_level : difficulty, 
            thumbnail : thumbnail, 
            description : description,
            email: user.email
        };

        console.log(info);
        fetch('http://localhost:5500/assignments', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(info)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.insertedId)
                {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Your Assignment has been created successfully",
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
        })
    }

    return (
      <div className="bg-blue-50 rounded-full w-full">
      <h1 className="text-3xt">Create Your Assignment</h1>
        <form onSubmit={handleCreateAssignment} className="rounded-full mb-10 card-body bg-blue-50">
        <div className="grid grid-cols-2 gap-7">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input type="text" name="title" placeholder="Title" className="input input-bordered" required />
        </div>
        <div className="form-control">
  <label className="label">
    <span className="label-text">Difficulty Level</span>
  </label>
  <select name="difficulty" className="select select-bordered" required>
    <option value="">Select Difficulty Level</option>
    <option value="easy">Easy</option>
    <option value="medium">Medium</option>
    <option value="hard">Hard</option>
  </select>
</div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Thumbnail</span>
          </label>
          <input type="text" name="thumbnail" placeholder="Thumbnail" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea placeholder="Description" name="description" className="textarea textarea-bordered textarea-lg w-full" ></textarea>
        </div>
        <div className="form-control mt-6">
<input className="btn btn-primary" type="submit" value="Create Assignment" />
        </div>
      </form>
      </div>
    );
};

export default CreateAssignment;
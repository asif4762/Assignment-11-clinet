import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";


const UpdateAssignment = () => {
    const [userData, setUserData] = useState([]);

    const {id} = useParams();
    console.log(id);

    const handleUpdate = e => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const difficulty_level = form.difficulty.value;
        const thumbnail = form.thumbnail.value;
        const description = form.description.value;
        const info = { title, difficulty_level, thumbnail, description,}
        console.log(info);
        fetch(`http://localhost:5500/Update-assignments/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.modifiedCount > 0)
        {
            Swal.fire({
                title: "Product Updated Successfully",
                text: "You clicked the button!",
                icon: "success"
              });
              form.reset();
        }
        })
    }

    useEffect(() => {
        fetch(`http://localhost:5500/assignments/${id}`)
        .then(res => res.json())
        .then(data => setUserData(data))
      }, [id]);

      console.log(userData);

    return (
        <div className="bg-blue-50 rounded-full w-full">
        <form onSubmit={handleUpdate} className="rounded-full mb-10 card-body bg-blue-50">
        <div className="grid grid-cols-2 gap-7">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input defaultValue={userData.title} type="text" name="title" placeholder="Title" className="input input-bordered" required />
        </div>
        <div className="form-control">
  <label className="label">
    <span className="label-text">Difficulty Level</span>
  </label>
  <select defaultValue={userData.difficulty_level} name="difficulty" className="select select-bordered" required>
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
          <input defaultValue={userData.thumbnail} type="text" name="thumbnail" placeholder="Thumbnail" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea defaultValue={userData.description} placeholder="Description" name="description" className="textarea textarea-bordered textarea-lg w-full" ></textarea>
        </div>
        <div className="form-control mt-6">
<input className="btn btn-primary" type="submit" value="Update Assignment" />
        </div>
      </form>
      </div>
    );
};

export default UpdateAssignment;
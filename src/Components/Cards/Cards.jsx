import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Cards = ({data}) => {

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5500/delete/${data._id}`, {
          method: "DELETE",
        })
        .then((res) => res.json())
        .then((dat) => {
          console.log(dat);
          if (dat.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            }).then(() => {
              window.location.reload();
            });
          }
        });
      }
    });
  }
  
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
  <figure className="px-10 pt-10">
    <img src={data.thumbnail} alt="Shoes" className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{data.title}</h2>
    <p>{data.difficulty_level}</p>
    <div className="card-actions">
      <Link to={`/assignments/${data._id}`}><button className="btn btn-primary">View Assignment</button></Link>
      <div className="w-1/2">
      <Link className="" to={`/update-assignments/${data._id}`}>
              <button className="btn w-ful">Update</button>
            </Link>
      </div>
      <button onClick={handleDelete} className="btn btn-secondary text-center w-3/2 mx-auto">Delete</button>
    </div>
  </div>
</div>
    );
};

export default Cards;
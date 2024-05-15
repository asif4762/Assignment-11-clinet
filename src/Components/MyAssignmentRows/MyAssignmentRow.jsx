import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Firebase/Provider/AuthProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyAssignmentRow = ({ assignment }) => {
  const [assignmentData, setAssignmentData] = useState(assignment);
  const { user } = useContext(AuthContext);

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
        fetch(`https://assignment-11-server-tawny-phi.vercel.app/delete/${assignment._id}`, {
          method: "DELETE",
        })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
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
  

  const handleGrade = async () => {
    const { value: marks } = await Swal.fire({
      title: "Enter Marks",
      input: "text",
      inputLabel: "Marks",
      inputPlaceholder: "Enter marks here",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Marks cannot be empty!";
        }
        if (isNaN(value)) {
          return "Marks must be a number!";
        }
      },
    });

    if (marks) {
      console.log("Student obtained marks:", marks);
      const info = { marks: marks };
      fetch(`https://assignment-11-server-tawny-phi.vercel.app/update-marks/${assignment._id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(info),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.modifiedCount > 0) {
            Swal.fire({
              title: "Assignment Graded Successfully",
              text: "You clicked the button!",
              icon: "success",
            }).then(() => {
              fetch(`https://assignment-11-server-tawny-phi.vercel.app/assignments/${assignment._id}`)
                .then((res) => res.json())
                .then((updatedAssignmentData) => {
                  setAssignmentData(updatedAssignmentData);
                })
                .catch((error) => {
                  console.error("Error fetching updated assignment:", error);
                });
            });
          }
        });
    }
  };

  console.log(user);
  console.log(assignmentData);
  const { thumbnail, title } = assignmentData;

  return (
    <tr>
      <th>
      <button onClick={handleDelete} className="btn btn-circle btn-outline">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
</button>
      </th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-24 h-24">
              <img src={thumbnail} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div className="font-bold">{user?.displayName || "User name not found"}</div>
            <div className="text-sm opacity-50">{user?.email}</div>
          </div>
        </div>
      </td>
      <td>
        <span className="">{title}</span>
      </td>
      <td>{assignmentData.marks ? assignmentData.marks : "Not Graded"}</td>
      <th>
        {assignmentData.marks ? (
          <h1 className="text-green-500">Graded</h1>
        ) : (
          <div>
            <button onClick={handleGrade} className="btn btn-ghost btn-xs">
              Give Mark
            </button>
            <Link to={`/update-assignments/${assignment._id}`}>
              <button className="btn btn-ghost btn-xs">Update</button>
            </Link>
          </div>
        )}
      </th>
    </tr>
  );
};

export default MyAssignmentRow;

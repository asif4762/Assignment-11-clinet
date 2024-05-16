import { useContext, useState } from "react";
import { AuthContext } from "../../../Firebase/Provider/AuthProvider";
import Swal from "sweetalert2";

const PendingSingleData = ({ assignment }) => {
  const [assignmentData, setAssignmentData] = useState(assignment);
  const { user } = useContext(AuthContext);

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
      const info = { marks: marks };
      try {
        const response = await fetch(`https://assignment-11-server-xi-flame.vercel.app/update-marks/${assignment._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(info),
        });
        const data = await response.json();
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Assignment Graded Successfully",
            text: "The assignment has been graded successfully.",
            icon: "success",
          })
          .then(() => {
            window.location.reload();
          })
          .then(() => {
            fetch(`https://assignment-11-server-xi-flame.vercel.app/${assignment._id}`)
              .then((res) => res.json())
              .then((updatedAssignmentData) => {
                setAssignmentData(updatedAssignmentData);
              })
              .catch((error) => {
                console.error("Error fetching updated assignment:", error);
              });
          });
        }
      } catch (error) {
        console.error("Error updating marks:", error);
        Swal.fire({
          title: "Error",
          text: "An error occurred while grading the assignment. Please try again later.",
          icon: "error",
        });
      }
    }
  };

  return (
    <tr>
      <th></th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-24 h-24">
              <img src={assignment.thumbnail} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div className="font-bold">{user?.displayName || "User name not found"}</div>
            <div className="text-sm opacity-50">{assignmentData?.email}</div>
          </div>
        </div>
      </td>
      <td>
        <span className="">{assignment.title}</span>
      </td>
      <td>{assignment.marks ? assignment.marks : "Not Graded"}</td>
      <th>
        <div className="flex">
        <h1 className="text-orange-500">Pending</h1>
        <div>
          <button onClick={handleGrade} className="btn btn-ghost btn-xs">
            Give Mark
          </button>
        </div>
        </div>
      </th>
    </tr>
  );
};

export default PendingSingleData;

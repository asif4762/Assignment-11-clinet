import { useContext } from "react";
import { AuthContext } from "../../Firebase/Provider/AuthProvider";
import { Link } from "react-router-dom";


const MyAssignmentRow = ({assignment}) => {

    const {user} = useContext(AuthContext);
    console.log(user);

    console.log(assignment);
    const {thumbnail, title} = assignment;

    return (
        <tr>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
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
        <td>{assignment.marks ? assignment.marks : "Not Graded"}</td>
        <th>
          {
            assignment.marks ? <h1 className="text-green-500">Graded</h1> : <div>
            <button className="btn btn-ghost btn-xs">Grade</button>
            <Link to={`/update-assignments/${assignment._id}`}>
            <button className="btn btn-ghost btn-xs">Update</button>
            </Link>
            </div>
          }
        </th>
      </tr>
    );
};

export default MyAssignmentRow;
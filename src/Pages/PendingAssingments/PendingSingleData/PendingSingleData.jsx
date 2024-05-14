import { useContext } from "react";
import { AuthContext } from "../../../Firebase/Provider/AuthProvider";


const PendingSingleData = ({assignment}) => {

    const {user} = useContext(AuthContext);

    return (
        <tr>
      <th>
      </th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-24 h-24">
              <img src={assignment.thumbnail} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div className="font-bold">{user?.displayName || "User name not found"}</div>
            <div className="text-sm opacity-50">{assignment?.email}</div>
          </div>
        </div>
      </td>
      <td>
        <span className="">{assignment.title}</span>
      </td>
      <td>{assignment.marks ? assignment.marks : "Not Graded"}</td>
      <th>
          <h1 className="text-orange-500">Pending</h1>
      </th>
    </tr>
    );
};

export default PendingSingleData;
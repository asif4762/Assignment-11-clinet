import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Firebase/Provider/AuthProvider";
import MyAssignmentRow from "../../Components/MyAssignmentRows/MyAssignmentRow";

const MyAssignments = () => {
    const [data, setData] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user && user.email) {
            const url = `https://assignment-11-server-tawny-phi.vercel.app/my-assignments?email=${user.email}`;
            fetch(url, {
                credentials: 'include',
            })
            .then(res => res.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching assignments:', error));
        }
    }, [user]);

    return (
        <div>
            <h1 className="text-3xl text-center font-bold mb-10">My Assignments </h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Title</th>
                            <th>Obtained Marks</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map(assignment => <MyAssignmentRow key={assignment._id} assignment={assignment}></MyAssignmentRow>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAssignments;

import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Firebase/Provider/AuthProvider";
import { useContext } from "react";

const SingleCard = () => {
    const {user} = useContext(AuthContext);
    const assignment = useLoaderData();
    const { title, thumbnail, difficulty_level, description, notes } = assignment;
    const handleTakeAssignment = async () => {
        const { value: docUrl } = await Swal.fire({
          title: "Upload Document",
          input: "text",
          inputAttributes: {
            placeholder: "Enter document URL",
            "aria-label": "Upload document",
          },
          showCancelButton: true,
          inputValidator: (value) => {
            if (!value) {
              return "Document URL cannot be empty!";
            }
            if (!isValidUrl(value)) {
              return "Please enter a valid URL!";
            }
          },
        });
      
        if (docUrl) {
          // Handle the document URL, e.g., display or process it
          Swal.fire({
            title: "Document URL",
            text: docUrl,
            icon: "success",
          });
        }
      };
      
      // Function to validate URL format

    const handlePost = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://assignment-11-server-xi-flame.vercel.app/my-assignments',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(assignment)
            });

            if (response.ok) {
                const data = await response.json();
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Assignment Taken Successfully",
                        text: "Marks have been submitted.",
                        icon: "success",
                    }).then(() => {
                    });
                } else {
                    Swal.fire({
                        title: "Error",
                        text: "Failed to update marks. Please try again.",
                        icon: "error",
                    });
                }
            } else {
                throw new Error("Failed to update marks.");
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                title: "Error",
                text: "An error occurred. Please try again later.",
                icon: "error",
            });
        }
    };

    return (
        <div>
            <div className="w-full my-10">
                <img className="w-full" src={thumbnail} alt="" />
            </div>

            <div>
                <h1 className="text-3xl font-bold text-center mb-10">{title}</h1>
                <h1 className="text-center mb-10"><span className="text-xl font-bold">Difficulty_Level :</span>{difficulty_level}</h1>
                <h1 className="mb-10"><span className="font-bold">Assignment : </span>{description}</h1>
                <button onClick={handleTakeAssignment} className="block mb-4 text-blue-500">Upload Doc/files</button>
                <div className="mb-4">
                    <span className="font-bold">Notes:</span> {notes}
                </div>
                <form>
                    <div className="mb-4">
                        <label htmlFor="feedback" className="font-bold mr-2">Feedback:</label>
                        <textarea id="feedback" name="feedback" className="border rounded p-2" rows="4"></textarea>
                    </div>
                    <button onClick={handlePost} type="submit" className="btn w-full mb-10 btn-secondary">Give FeedBack</button>
                </form>
            </div>
        </div>
    );
};

export default SingleCard;

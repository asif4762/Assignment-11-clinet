import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const SingleCard = () => {
    const assignment = useLoaderData();
    const { title, thumbnail, difficulty_level, description, pdfLink, notes } = assignment;

    const handleTakeAssignment = async () => {
        const { value: file } = await Swal.fire({
            title: "Select image",
            input: "file",
            inputAttributes: {
                "accept": "image/*",
                "aria-label": "Upload your profile picture"
            }
        });
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                Swal.fire({
                    title: "Your uploaded picture",
                    imageUrl: e.target.result,
                    imageAlt: "The uploaded picture"
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGrade = async (e) => {
        e.preventDefault();

        const marks = e.target.elements.marks.value;
        const feedback = e.target.elements.feedback.value;

        if (!marks || isNaN(marks)) {
            Swal.fire({
                title: "Invalid Marks",
                text: "Please enter a valid number for marks.",
                icon: "error",
            });
            return;
        }

        const info = { marks, feedback };

        try {
            const response = await fetch(`http://localhost:5500/update-marks/${assignment._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(info),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Assignment Graded Successfully",
                        text: "Marks have been submitted.",
                        icon: "success",
                    }).then(() => {
                        // Optionally reload or update data after grading
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
                <button onClick={handleTakeAssignment} className="block mb-4 text-blue-500">View PDF/Docs</button>
                <div className="mb-4">
                    <span className="font-bold">Notes:</span> {notes}
                </div>
                <form onSubmit={handleGrade}>
                    <div className="mb-4">
                        <label htmlFor="marks" className="font-bold mr-2">Marks:</label>
                        <input type="number" id="marks" name="marks" className="border rounded p-2" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="feedback" className="font-bold mr-2">Feedback:</label>
                        <textarea id="feedback" name="feedback" className="border rounded p-2" rows="4"></textarea>
                    </div>
                    <button type="submit" className="btn w-full mb-10 btn-secondary">Submit Marks</button>
                </form>
            </div>
        </div>
    );
};

export default SingleCard;

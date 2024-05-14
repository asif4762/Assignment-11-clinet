import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";


const SingleCard = () => {
    const assignment = useLoaderData();
    const {title, thumbnail, difficulty_level, description} = assignment;
    const handleTakeAssignment = async () =>{
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
    }
    return (
        <div>
            <div className="w-full my-10">
                <img className="w-full" src={thumbnail} alt="" />
            </div>

            <div>
                <h1 className="text-3xl font-bold text-center mb-10">{title}</h1>
                <h1 className="text-center mb-10"><span className="text-xl font-bold">Difficulty_Level :</span>{difficulty_level}</h1>
                <h1 className="mb-10"><span className="font-bold">Assignment : </span>{description}</h1>
                <button onClick={handleTakeAssignment} className="btn w-full mb-10 btn-secondary">Take Assignment</button>
            </div>

        </div>
    );
};

export default SingleCard;
import { Link } from "react-router-dom";

const Cards = ({data}) => {
    console.log(data);
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
    </div>
  </div>
</div>
    );
};

export default Cards;
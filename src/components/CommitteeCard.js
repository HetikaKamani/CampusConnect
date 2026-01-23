import "./CommitteeCard.css";
import { Link } from "react-router-dom";


function CommitteeCard({ id,title, description, followers, color, gradient }) {
  return (
    <div className={`committee-card ${color}`}>
      <div
        className="card-header"
        style={{ background: gradient }}
      >
        <h3>{title}</h3>
        <button className="fav-btn">❤️</button>
      </div>

      <div className="card-body">
        <p>{description}</p>

        <div className="followers">
          👥 {followers} followers
        </div>

        <Link to={`/committees/${id}`} className="view-link">
        View Committee →
        </Link>
      </div>
    </div>
  );
}

export default CommitteeCard;

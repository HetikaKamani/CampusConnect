import CommitteeCard from "../components/CommitteeCard";
import  committees from "../data/committees";
import "./Committees.css";

function Committees() {
  return (
    <div className="committees-page">
      <div className="committees-container">
        <h1 className="committees-title">
          Campus <span className="title-highlight">Committees</span>
        </h1>

        <div className="committees-grid">
          {committees.map((committee) => (
            <CommitteeCard
              key={committee.id}
              id={committee.id}
              title={committee.name}
              description={committee.description}
              color={committee.color}
              followers={0}
              gradient={committee.gradient}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Committees;

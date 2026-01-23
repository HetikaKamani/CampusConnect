// import CommitteeCard from "../components/CommitteeCard";
// import "./Committees.css";

// function Committees() {
//   return (
//     <div className="committees-page">
//       <div className="committees-container">
//         <h1 className="committees-title">Campus <span className="title-highlight"> Committees</span></h1>
//         <h4 className="committees-para">Follow your favorite committees to personalize your event feed</h4>

//         <div className="committees-grid">
//           <CommitteeCard
//             title="Technical Committee"
//             description="Hackathons, coding events and tech workshops"
//             followers={0}
//             color="blue"
//           />
//           <CommitteeCard
//             title="Cultural Committee"
//             description="Dance, music, drama and cultural festivals"
//             followers={0}
//             color="pink"
//           />
//           <CommitteeCard
//             title="Literary Committee"
//             description="Debates, poetry slams, writing workshops"
//             followers={0}
//             color="purple"
//           />
//           <CommitteeCard
//             title="Entrepreneurship Cell"
//             description="Startup talks, pitch events and business workshops"
//             followers={0}
//             color="green"
//           />
//           <CommitteeCard
//             title="Sports Committee"
//             description="Indoor and outdoor sports events"
//             followers={0}
//             color="orange"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Committees;

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

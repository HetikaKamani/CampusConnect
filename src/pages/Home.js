// import "./Home.css";
// import {useNavigate} from "react-router-dom";

// function Home() {
//     const navigate = useNavigate();
//   return (
//     <div className="home">
//    <section className="hero-wrapper">
//   <div class="bg-glow bg-purple"></div>
//   <div class="bg-glow bg-pink"></div>
//   <div class="bg-glow bg-green"></div>        
//       {/* HERO SECTION */}
//       <section className="hero">
//         <div className="hero-container">
          
//           {/* LEFT */}
//           <div className="hero-left">
//             {/* <span className="hero-badge">Your Campus Event Hub</span> */}

//             <h1 className="hero-title">
//               Never Miss <br />
//               <span className="highlight">Campus</span><br /> Moments
//             </h1>

//             <p className="hero-description">
//               Discover events, follow your favorite committees, and stay connected
//               with everything happening on campus.
//             </p>

//             <div className="hero-buttons">
//               <button className="primary-btn" onClick={()=> navigate("/events")}>Explore Events</button>
//               <button className="secondary-btn" onClick={() => navigate("/calendar")}>View Calendar</button>
//             </div>

//             <div className="hero-stats">
//               <div className="stat">
//                 <h3>6+</h3>
//                 <p>Upcoming Events</p>
//               </div>
//               <div className="stat">
//                 <h3>5</h3>
//                 <p>Committees</p>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT */}
//           <div className="hero-right">
//             <div className="featured-card">
//               <img
//                 src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//                 alt="Hackathon"
//                 className="featured-img"
//               />
//               <div className="featured-overlay">
//                 <span className="tag">Technical</span>
//                 <h3>HackCampus 2024</h3>
//                 <p>
//                   24-hour hackathon challenging students to build innovative
//                   solutions. Cash prizes worth $5000!
//                 </p>
//               </div>
//             </div>
//           </div>

//         </div>
//       </section>
//       </section>
//     <div className="com_following">
//   <div className="com-container">
//     <h2 className="com-title">Your Committees</h2>
//     <p className="com-subtitle">Committees you're following</p>

//     <div className="following">
//       {/* Committee cards will come here */}
//     </div>
//   </div>
// </div>
//     </div>
//   );
// }

// export default Home;
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Home() {
  const navigate = useNavigate();

  // 🔹 Images for past memories showcase (UI only)
  const memoryImages = [
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1170&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1170&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29uY2VydHxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1170&auto=format&fit=crop",
  ];

  // 🔹 Auto-rotate images
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % memoryImages.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">
      <section className="hero-wrapper">
        <div className="bg-glow bg-purple"></div>
        <div className="bg-glow bg-pink"></div>
        <div className="bg-glow bg-green"></div>

        {/* HERO SECTION */}
        <section className="hero">
          <div className="hero-container">
            {/* LEFT */}
            <div className="hero-left">
              <h1 className="hero-title">
                Never Miss <br />
                <span className="highlight">Campus</span>
                <br /> Moments
              </h1>

              <p className="hero-description">
                Discover events, follow your favorite committees, and stay
                connected with everything happening on campus.
              </p>

              <div className="hero-buttons">
                <button
                  className="primary-btn"
                  onClick={() => navigate("/events")}
                >
                  Explore Events
                </button>
                <button
                  className="secondary-btn"
                  onClick={() => navigate("/calendar")}
                >
                  View Calendar
                </button>
              </div>

              <div className="hero-stats">
                <div className="stat">
                  <h3>6+</h3>
                  <p>Upcoming Events</p>
                </div>
                <div className="stat">
                  <h3>5</h3>
                  <p>Committees</p>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="hero-right">
              <div className="featured-card">
                <img
                  src={memoryImages[currentImage]}
                  alt="Campus Memories"
                  className="featured-img"
                />
                <div className="featured-overlay">
                  <span className="tag">Previous Memories</span>
                  <h3>Moments From Campus Life</h3>
                  <p>
                    A glimpse of unforgettable events, celebrations, and
                    experiences from across the campus.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>

      {/* COMMITTEES FOLLOWING */}
      <div className="com_following">
        <div className="com-container">
          <h2 className="com-title">Your Committees</h2>
          <p className="com-subtitle">Committees you're following</p>

          <div className="following">
            {/* Committee cards will come here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

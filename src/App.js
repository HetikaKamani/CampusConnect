import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Committees from "./pages/Committees";
import CommitteeDetail from "./pages/CommitteeDetail";
import Navbar from "./components/Navbar";
import Calendar from "./pages/Calendar";
import Updates from "./pages/Updates";
import AdminLogin from "./pages/AdminLogin";
import EventDetail from "./pages/EventDetail";
import AdminDashboard from "./pages/AdminDashboard";


// function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/events" element={<Events />} />
//         <Route path="/committees" element={<Committees />} />
//         <Route path="/committees/:id" element={<CommitteeDetail />} />
//         <Route path="/calendar" element={<Calendar />} />
//         <Route path="/updates" element={<Updates />} />
//         <Route path="/admin/login" element={<AdminLogin />} />  
//         <Route path="/admin/dashboard" element ={<AdminDashboard/>}/>
//         <Route path="/events/:id" element={<EventDetail />} />    
//       </Routes>
//     </BrowserRouter>
//   );
// }
// export default App;
function App(){
  return(
    <BrowserRouter>
    <Navbar />
  {/* <div style={{ paddingTop: "80px" }}> */}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<Events />} />
      <Route path="/events/:id" element={<EventDetail />} />
      <Route path="/committees" element={<Committees />} />
      <Route path="/committees/:id" element={<CommitteeDetail />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/updates" element={<Updates />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  {/* </div> */}
    </BrowserRouter>
  )
}
export default App;
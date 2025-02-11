import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login";
import Dashboard from "./Dashboard";
import Report from "./Report"; // Import the new Report component
import JApage from "./japage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/report" element={<Report/>} /> {/* Added Report Route */}
        <Route path="/japage" element={<JApage/>}/>
      </Routes>
    </Router>
  );
}

export default App;

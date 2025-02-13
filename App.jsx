import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login";
import Dashboard from "./Dashboard";
import Report from "./Report"; // Import the new Report component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report" element={<Report />} /> {/* Added Report Route */}
      </Routes>
    </Router>
  );
}

export default App;

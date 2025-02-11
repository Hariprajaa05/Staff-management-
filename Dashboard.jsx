import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [iatData, setIatData] = useState([]);
  const [universityData, setUniversityData] = useState([]);
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const staff_id = user?.staff_id;
// Retrieve stored staff_id

  useEffect(() => {
    if (!staff_id) {
      alert("User not logged in!");
      navigate("/");
      return;
    }

    // Fetch Data with staff_id Query
    axios.get(`http://localhost:5000/api/getIATDetails?staff_id=${staff_id}`)
      .then((response) => setIatData(response.data))
      .catch((error) => console.error("Error fetching IAT Marks:", error));

    axios.get(`http://localhost:5000/api/getUniversityDetails?staff_id=${staff_id}`)
      .then((response) => setUniversityData(response.data))
      .catch((error) => console.error("Error fetching University Marks:", error));

    axios.get(`http://localhost:5000/api/getFeedbackDetails?staff_id=${staff_id}`)
      .then((response) => setFeedbackData(response.data))
      .catch((error) => console.error("Error fetching Feedback Marks:", error))
      .finally(() => setLoading(false));
  }, [staff_id, navigate]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2 style={{ color: "#FCFFE7", marginTop: "20px" }}>IAT MARKS</h2>
      <TableSection data={iatData} totalKey="total_iat" />

      <h2 style={{ color: "#FCFFE7", marginTop: "20px" }}>UNIVERSITY MARKS</h2>
      <TableSection data={universityData} totalKey="total_univ" />

      <h2 style={{ color: "#FCFFE7", marginTop: "20px" }}>FEEDBACK MARKS</h2>
      <TableSection data={feedbackData} totalKey="total_feed" />
    </div>
  );
};

// Table Section (Supports Multiple Rows)
const TableSection = ({ data, totalKey }) => (
  <table width="95%" style={{ color: "#FCFFE7", margin: "auto", borderCollapse: "collapse", textAlign: "center", fontSize: "22px", border: "3px solid black" }}>
    <thead>
      <tr style={{ background: "#2B3467", color: "#FCFFE7", height: "50px" }}>
        <th style={{ padding: "15px", border: "3px solid black", minWidth: "100px" }}>S.No</th>
        <th style={{ padding: "15px", border: "3px solid black", minWidth: "300px" }}>Name</th>
        <th style={{ padding: "15px", border: "3px solid black", minWidth: "200px" }}>Year</th>
        <th style={{ padding: "15px", border: "3px solid black", minWidth: "250px" }}>Total</th>
      </tr>
    </thead>
    <tbody>
      {data.length > 0 ? (
        data.map((item, index) => (
          <tr key={index} style={{ background: "#1E1E1E", height: "40px" }}>
            <td style={{ padding: "15px", border: "3px solid black" }}>{index + 1}</td>
            <td style={{ padding: "15px", border: "3px solid black" }}>{item.staff_name}</td>
            <td style={{ padding: "15px", border: "3px solid black" }}>{item.year}</td>
            <td style={{ padding: "15px", border: "3px solid black" }}>{item[totalKey]}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="4" style={{ padding: "15px", border: "3px solid black", textAlign: "center" }}>No Data Available</td>
        </tr>
      )}
    </tbody>
  </table>
);

export default Dashboard;

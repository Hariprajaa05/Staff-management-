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

  useEffect(() => {
    if (!staff_id) {
      alert("User not logged in!");
      navigate("/");
      return;
    }

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
      <Section title="IAT MARKS" data={iatData} totalKey="total_iat" navigate={navigate} reportType="iat" />
      <Section title="UNIVERSITY MARKS" data={universityData} totalKey="total_univ" navigate={navigate} reportType="university" />
      <Section title="FEEDBACK MARKS" data={feedbackData} totalKey="total_feed" navigate={navigate} reportType="feedback" />
    </div>
  );
};

const Section = ({ title, data, totalKey, navigate, reportType }) => (
  <div>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h2 style={{ color: "#FCFFE7", marginTop: "20px" }}>{title}</h2>
      <button
        onClick={() => navigate(`/report?table=${reportType}`)}
        style={{
          width: "25%",
          padding: "12px",
          fontSize: "20px",
          background: "#FCFFE7",
          color: "#2B3467",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        Go to {title} Report
      </button>
    </div>
    <TableSection data={data} totalKey={totalKey} />
  </div>
);

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

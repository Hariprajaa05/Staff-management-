import React from "react";
import { useSearchParams } from "react-router-dom";

const Report = () => {
  const [searchParams] = useSearchParams();
  const table = searchParams.get("table");
  const staff_id = searchParams.get("staff_id");

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "50px", padding: "20px" }}>
      <div style={{ width: "80%" }}>
        <h2 style={{ color: "#FCFFE7", textAlign: "center", fontSize: "24px" }}>Detailed Report</h2>
        <p style={{ color: "#FCFFE7", textAlign: "center", fontSize: "18px" }}>Staff ID: {staff_id}</p>

        <button
          style={{
            marginBottom: "20px",
            padding: "12px",
            background: "#2B3467",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: "bold",
            display: "block",
            width: "40%",
            borderRadius: "5px",
            margin: "0 auto",
          }}
          onClick={() => alert("Download feature not implemented yet!")}
        >
          Download Report
        </button>
        <br />

        {/* Render the appropriate table based on the `table` query parameter */}
        {table === "iat" && <IATTable />}
        {table === "university" && <UniversityTable />}
        {table === "feedback" && <FeedbackTable />}
      </div>
    </div>
  );
};

// IAT Table Component
const IATTable = () => {
  return (
    <>
      <h3 style={{ color: "#FCFFE7", textAlign: "center", fontSize: "20px", marginBottom: "10px" }}>Table 1 - IAT SCORE</h3>
      <table
        width="100%"
        style={{
          color: "#FCFFE7",
          textAlign: "center",
          fontSize: "20px",
          borderCollapse: "collapse",
          border: "3px solid #000",
          tableLayout: "fixed",
        }}
      >
        <thead>
          <tr style={{ background: "#2B3467", color: "white", height: "60px", borderBottom: "3px solid #000" }}>
            <th rowSpan="2" style={{ border: "3px solid #000", padding: "15px", width: "5%" }}>S.No</th>
            <th rowSpan="2" style={{ border: "3px solid #000", padding: "15px", width: "15%" }}>Name</th>
            <th rowSpan="2" style={{ border: "3px solid #000", padding: "15px", width: "10%" }}>Semester</th>
            <th colSpan="3" style={{ border: "3px solid #000", padding: "15px", width: "25%" }}>Paper 1</th>
            <th colSpan="3" style={{ border: "3px solid #000", padding: "15px", width: "25%" }}>Paper 2</th>
            <th rowSpan="2" style={{ border: "3px solid #000", padding: "15px", width: "10%" }}>Total Average</th>
            <th rowSpan="2" style={{ border: "3px solid #000", padding: "15px", width: "10%" }}>Final Score</th>
          </tr>
          <tr style={{ background: "#2B3467", color: "white", height: "50px", borderBottom: "3px solid #000" }}>
            <th style={{ border: "3px solid #000", padding: "15px" }}>IAT1</th>
            <th style={{ border: "3px solid #000", padding: "15px" }}>IAT2</th>
            <th style={{ border: "3px solid #000", padding: "15px" }}>Avg_p1</th>
            <th style={{ border: "3px solid #000", padding: "15px" }}>IAT1</th>
            <th style={{ border: "3px solid #000", padding: "15px" }}>IAT2</th>
            <th style={{ border: "3px solid #000", padding: "15px" }}>Avg_p2</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ height: "50px", borderBottom: "3px solid #000" }}>
            <td rowSpan="2" style={{ border: "3px solid #000", padding: "15px" }}>1</td>
            <td rowSpan="2" style={{ border: "3px solid #000", padding: "15px" }}></td>
            <td style={{ border: "3px solid #000", padding: "15px" }}>Odd</td>
            <td style={{ border: "3px solid #000", padding: "15px" }}></td>
            <td style={{ border: "3px solid #000", padding: "15px" }}></td>
            <td style={{ border: "3px solid #000", padding: "15px" }}></td>
            <td style={{ border: "3px solid #000", padding: "15px" }}></td>
            <td style={{ border: "3px solid #000", padding: "15px" }}></td>
            <td style={{ border: "3px solid #000", padding: "15px" }}></td>
            <td style={{ border: "3px solid #000", padding: "15px" }}></td>
            <td rowSpan="2" style={{ border: "3px solid #000", padding: "15px" }}></td>
          </tr>
          <tr style={{ height: "50px", borderBottom: "3px solid #000" }}>
            <td style={{ border: "3px solid #000", padding: "15px" }}>Even</td>
            <td style={{ border: "3px solid #000", padding: "15px" }}></td>
            <td style={{ border: "3px solid #000", padding: "15px" }}></td>
            <td style={{ border: "3px solid #000", padding: "15px" }}></td>
            <td style={{ border: "3px solid #000", padding: "15px" }}></td>
            <td style={{ border: "3px solid #000", padding: "15px" }}></td>
            <td style={{ border: "3px solid #000", padding: "15px" }}></td>
            <td style={{ border: "3px solid #000", padding: "15px" }}></td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

// University Table Component
const UniversityTable = () => {
  return (
    <>
      <h3 style={{ color: "#FCFFE7", textAlign: "center", fontSize: "20px", marginBottom: "10px" }}>Table 2 - UNIVERSITY SCORE</h3>
      <table
        width="100%"
        style={{
          color: "#FCFFE7",
          textAlign: "center",
          fontSize: "20px",
          borderCollapse: "collapse",
          border: "3px solid #000",
          tableLayout: "fixed",
        }}
      >
        <thead>
          <tr style={{ background: "#2B3467", color: "white", height: "60px", borderBottom: "3px solid #000" }}>
            <th rowSpan="2" style={{ border: "3px solid #000", padding: "15px", width: "5%" }}>S.No</th>
            <th rowSpan="2" style={{ border: "3px solid #000", padding: "15px", width: "15%" }}>Name</th>
            <th rowSpan="2" style={{ border: "3px solid #000", padding: "15px", width: "10%" }}>Semester</th>
            <th rowSpan="2" style={{ border: "3px solid #000", padding: "15px", width: "25%" }}>Paper 1</th>
            <th rowSpan="2" style={{ border: "3px solid #000", padding: "15px", width: "25%" }}>Paper 2</th>
            <th rowSpan="2" style={{ border: "3px solid #000", padding: "15px", width: "10%" }}>Total Average</th>
            <th rowSpan="2" style={{ border: "3px solid #000", padding: "15px", width: "10%" }}>Final Score</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ height: "50px", borderBottom: "3px solid #000" }}>
            <td rowSpan="2" style={{ border: "3px solid #000", padding: "15px" }}>1</td>
            <td rowSpan="2" style={{ border: "3px solid #000", padding: "15px" }}></td>
            <td style={{ border: "3px solid #000", padding: "15px" }}></td>
            <td style={{ border: "3px solid #000", padding: "15px" }}></td>
            <td style={{ border: "3px solid #000", padding: "15px" }}></td>
            <td style={{ border: "3px solid #000", padding: "15px" }}></td>
            <td rowSpan="2" style={{ border: "3px solid #000", padding: "15px" }}></td>
          </tr>
          <tr style={{ height: "50px", borderBottom: "3px solid #000" }}>
            <td style={{ border: "3px solid #000", padding: "15px" }}>Even</td>
            <td style={{ border: "3px solid #000", padding: "15px" }}></td>
            <td style={{ border: "3px solid #000", padding: "15px" }}></td>
            <td style={{ border: "3px solid #000", padding: "15px" }}></td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

// Feedback Table Component
const FeedbackTable = () => {
  return (
    <>
      <h3 style={{ color: "#FCFFE7", textAlign: "center", fontSize: "20px", marginBottom: "10px" }}>Table 3 - FEEDBACK SCORE</h3>
      <table
        width="100%"
        style={{
          color: "#FCFFE7",
          textAlign: "center",
          fontSize: "20px",
          borderCollapse: "collapse",
          border: "3px solid #000",
          tableLayout: "fixed",
        }}
      >
        <thead>
          <tr style={{ background: "#2B3467", color: "white", height: "60px", borderBottom: "3px solid #000" }}>
            <th rowSpan="2" style={{ border: "3px solid #000", padding: "15px", width: "5%" }}>S.No</th>
            <th rowSpan="2" style={{ border: "3px solid #000", padding: "15px", width: "15%" }}>Name</th>
            <th rowSpan="2" style={{ border: "3px solid #000", padding: "15px", width: "10%" }}>Semester</th>
            <th rowSpan="2" style={{ border: "3px solid #000", padding: "15px", width: "25%" }}>Paper 1</th>
            <th rowSpan="2" style={{ border: "3px solid #000", padding: "15px", width: "25%" }}>Paper 2</th>
            <th rowSpan="2" style={{ border: "3px solid #000", padding: "15px", width: "10%" }}>Total Average</th>
            <th rowSpan="2" style={{ border: "3px solid #000", padding: "15px", width: "10%" }}>Final Score</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ height: "50px", borderBottom: "3px solid #000" }}>
            <td rowSpan="2" style={{ border: "3px solid #000", padding: "15px" }}>1</td>
            <td rowSpan="2" style={{ border: "3px solid #000", padding: "15px" }}></td>
            <td style={{ border: "3px solid #000", padding: "15px" }}>Odd</td>
            <td style={{ border: "3px solid #000", padding: "15px" }}></td>
            <td style={{ border: "3px solid #000", padding: "15px" }}></td>
            <td style={{ border: "3px solid #000", padding: "15px" }}></td>
            <td rowSpan="2" style={{ border: "3px solid #000", padding: "15px" }}></td>
          </tr>
          <tr style={{ height: "50px", borderBottom: "3px solid #000" }}>
            <td style={{ border: "3px solid #000", padding: "15px" }}>Even</td>
            <td style={{ border: "3px solid #000", padding: "15px" }}></td>
            <td style={{ border: "3px solid #000", padding: "15px" }}></td>
            <td style={{ border: "3px solid #000", padding: "15px" }}></td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Report;

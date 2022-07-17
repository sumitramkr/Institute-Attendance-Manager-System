import React from "react";
import "./styles.css";

function TableTitle() {
  return (
    <div className="row center-row">
      <div className="col-lg-3 col-md-3 col-sm-3 center-col">
        <h2>Sr. No.</h2>
      </div>

      <div className="col-lg-3 col-md-3 col-sm-3 center-col">
        <h2>Name</h2>
      </div>

      <div className="col-lg-3 col-md-3 col-sm-3 center-col">
        <h2>Roll Number</h2>
      </div>

      <div className="col-lg-3 col-md-3 col-sm-3 center-col">
        <h2>Attendance</h2>
      </div>
    </div>
  );
}

export default TableTitle;

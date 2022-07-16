import React from "react";

function TableTitle() {
  return (
    <div className="row">
      <div className="col-lg-3 col-md-3 col-sm-3">
        <h2>Name</h2>
      </div>

      <div className="col-lg-3 col-md-3 col-sm-3">
        <h2>Roll Number</h2>
      </div>

      <div className="col-lg-3 col-md-3 col-sm-3">
        <h2>Marking</h2>
      </div>

      <div className="col-lg-3 col-md-3 col-sm-3">
        <h2>Attendance</h2>
      </div>
    </div>
  );
}

export default TableTitle;

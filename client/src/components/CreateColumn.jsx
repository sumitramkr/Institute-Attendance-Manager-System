import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./styles.css";

function CreateColumn({
  val1,
  val2,
  setVal1,
  setVal2,
  secName,
  goAttendance,
  setGoAttendance,
  setSecName,
  setHome,
}) {
  let date_obj = new Date();
  let date = ("0" + date_obj.getDate()).slice(-2);
  let month = ("0" + (date_obj.getMonth() + 1)).slice(-2);
  let year = date_obj.getFullYear();
  let showDate = date + "-" + month + "-" + year;

  //   let [val1, setVal1] = useState("0");
  //   let [val2, setVal2] = useState("0");
  //   let [secName, setSecName] = useState("");
  //   let [goAttendance, setGoAttendance] = useState(0);

  function valueChanged(event) {
    const checkChecked = event.target.id;
    // console.log(checkChecked);
    if (checkChecked === "section1") {
      setVal1("1");
      setVal2("0");
      setSecName("Section 1");
    } else if (checkChecked === "section2") {
      setVal2("1");
      setVal1("0");
      setSecName("Section 2");
    } else {
      setVal1("0");
      setVal2("0");
      setSecName("");
    }
  }

  useEffect(() => {
    Axios.get("http://localhost:9000/createColumn").then((response) => {
      setSecName(response.data);
    });
  }, []);

  function sendColumn(event) {
    setGoAttendance(1);
    setHome(0);
    Axios.post("http://localhost:9000/createColumn", { secName, goAttendance });

    // console.log(secName);
    //event.preventDefault();
  }

  //   function goForAttendance(event) {
  //     if (event.target) {
  //     }
  //   }

  return (
    <div>
      <h2>CS102: Introduction to Data Structures</h2>
      <h3>{showDate}</h3>
      <form className="form-body">
        <div className="form-check check-line center-col">
          <input
            className="form-check-input"
            type="checkbox"
            id="section1"
            name="section"
            value={val1}
            checked={val1 === "1"}
            onChange={valueChanged}
          />
          <label className="form-check-label" for="section1">
            Section 1
          </label>
        </div>

        <div className="form-check check-line center-col">
          <input
            className="form-check-input"
            type="checkbox"
            id="section2"
            name="section"
            value={val2}
            checked={val2 === "1"}
            onChange={valueChanged}
          />
          <label className="form-check-label" for="section2">
            Section 2
          </label>
        </div>
        <div className="submit-btn d-grid gap-2 d-md-flex justify-content-md-center">
          <button
            type="submit"
            className="btn btn-lg btn-primary"
            onClick={sendColumn}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateColumn;

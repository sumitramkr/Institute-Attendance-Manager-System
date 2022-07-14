import React, { useState } from "react";
import Axios from "axios";

function Attendance() {
  const [Attedanceist, setAttedanceList] = useState([]);
  const [attendanceMarking, setAttendanceMarking] = useState("1");

  Axios.get("http://localhost:9000/getAttendanceList").then((response) => {
    console.log(response);
  });

  function changeValue(event) {
    let value = event.target.value;
    // console.log([value]);

    setAttendanceMarking(value);
    // console.log(attendanceMarking);
  }

  function sendAllValues() {
    Axios.post("http://localhost:9000/attendance", { attendanceMarking });
  }

  return (
    <div>
      <h4>Name</h4>
      <h4>Roll Number</h4>

      <div>
        <form>
          <input
            type="radio"
            id="present"
            name="attendance"
            value="1"
            checked={attendanceMarking === "1"}
            onChange={changeValue}
          />
          <label for="present">Present</label>

          <input
            type="radio"
            id="absent"
            name="attendance"
            value="0"
            checked={attendanceMarking === "0"}
            onChange={changeValue}
          />
          <label for="absent">Absent</label>

          <button type="submit" onClick={sendAllValues}>
            Submit
          </button>
        </form>
        <p>
          Selected <strong>{attendanceMarking}</strong>
        </p>
      </div>
    </div>
  );
}

export default Attendance;

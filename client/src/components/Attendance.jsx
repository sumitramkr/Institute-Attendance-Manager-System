import React, { useState } from "react";
import Axios from "axios";

function Attendance() {
  const [attedanceList, setAttedanceList] = useState([]);
  const [attendanceMarking, setAttendanceMarking] = useState({
    present1: "1",
  });

  Axios.get("http://localhost:9000/attendance").then((response) => {
    setAttedanceList(response.data.data.values);
  });

  function changeValue(event) {
    let { name, value } = event.target;
    // console.log(event.target);

    setAttendanceMarking((attendanceMarking) => {
      return { ...attendanceMarking, [name]: value };
    });
    console.log(attendanceMarking);
  }

  function sendAllValues() {
    Axios.post("http://localhost:9000/attendance", { attendanceMarking });
  }

  return (
    <form>
      {attedanceList.map((val, index) => {
        if (index !== 0) {
          let attendance = "attendance" + index;
          let present = "present" + index;
          let absent = "absent" + index;

          return (
            <div key={index}>
              <div>
                {val[0]} {val[1]}
                <input
                  type="radio"
                  id={present}
                  name={attendance}
                  value="1"
                  checked={attendanceMarking === "1"}
                  onChange={changeValue}
                />
                <label for={present}>Present</label>
                <input
                  type="radio"
                  id={absent}
                  name={attendance}
                  value="0"
                  checked={attendanceMarking === "0"}
                  onChange={changeValue}
                />
                <label for={absent}>Absent</label>
              </div>
            </div>
          );
        }
      })}
      <button type="submit" onClick={sendAllValues}>
        Submit
      </button>
      <div>
        <p>
          Selected <strong>{attendanceMarking}</strong>
        </p>
      </div>
    </form>
  );
}

export default Attendance;

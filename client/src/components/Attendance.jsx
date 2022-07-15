import React, { useState } from "react";
import Axios from "axios";

function Attendance() {
  const [attedanceList, setAttedanceList] = useState([]);
  // const [attendanceMarking, setAttendanceMarking] = useState([]);

  Axios.get("http://localhost:9000/attendance").then((response) => {
    setAttedanceList(response.data.data.values);
  });
  // console.log(attedanceList);

  // function changeValue(event) {
  //   let { name, value } = event.target;
  //   // console.log(event.target);

  //   setAttendanceMarking((attendanceMarking) => {
  //     return [...attendanceMarking, value];
  //   });
  //   // console.log(attendanceMarking);
  // }

  function sendAllValues() {
    Axios.post("http://localhost:9000/attendance", { attedanceList });
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
                  checked={val[2] === "1"}
                  onChange={(val[2] = "1")}
                />
                <label for={present}>Present</label>
                <input
                  type="radio"
                  id={absent}
                  name={attendance}
                  value="0"
                  checked={val[2] === "0"}
                  onChange={(val[2] = "0")}
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
    </form>
  );
}

export default Attendance;

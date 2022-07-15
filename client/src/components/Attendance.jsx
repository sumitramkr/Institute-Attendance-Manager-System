import React, { useState } from "react";
import Axios from "axios";

function Attendance() {
  const [attedanceList, setAttedanceList] = useState([]);
  // const [attendanceMarking, setAttendanceMarking] = useState([]);

  Axios.get("http://localhost:9000/attendance").then((response) => {
    setAttedanceList(response.data.data.values);
    // setAttendanceMarking(
    //   response.data.data.values.map((items) => {
    //     return [items[0], items[2]];
    //   })
    // );
  });
  // console.log(attendanceMarking);

  // function changeValue(event) {
  //   setAttendanceMarking([
  //     attendanceMarking.map((items) => {
  //       let { name, value } = event.target;
  //       if (items[0] === name) {
  //         return [(items[0] = name), (items[1] = value)];
  //       } else {
  //         return [items[0], items[1]];
  //       }
  //     }),
  //   ]);
  //   console.log(attendanceMarking);
  //   console.log(attedanceList);

  //   // console.log(event.target);
  // }

  function changeValue(event) {
    let { name, value } = event.target;
    setAttedanceList([
      attedanceList.map((items) => {
        return items[0] === name
          ? [...attedanceList, [items[0], items[1], (items[2] = value)]]
          : [...attedanceList, [items[0], items[1], items[2]]];
      }),
    ]);
    // console.log(attendanceMarking);
    event.preventDefault();
    console.log(attedanceList);

    // console.log(event.target);
  }

  function sendAllValues() {
    Axios.post("http://localhost:9000/attendance", { attedanceList });
  }

  return (
    <form>
      {attedanceList.map((val, index) => {
        if (index !== 0) {
          let present = "present" + index;
          let absent = "absent" + index;
          return (
            <div key={index}>
              <div>
                {val[0]} {val[1]}
                <input
                  type="radio"
                  id={present}
                  name={val[0]}
                  value="1"
                  checked={val[2] === "1"}
                  onChange={changeValue}
                />
                <label for={present}>Present</label>
                <input
                  type="radio"
                  id={absent}
                  name={val[0]}
                  value="0"
                  checked={val[2] === "0"}
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
    </form>
  );
}

export default Attendance;

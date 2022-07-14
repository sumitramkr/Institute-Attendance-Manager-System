import React, { useState } from "react";

function Attendance() {
  const [attendanceMarking, setAttendanceMarking] = useState({
    cell1: 1,
  });

  function Change(event) {
    let value = event.target.value;

    setAttendanceMarking((attendanceMarking) => {
      return {
        ...attendanceMarking,
        cell1: value,
      };
    });
  }

  //   function AbsentChange(event) {
  //     let absentValue = event.target.value;
  //     setAttendanceMarking((attendanceMarking) => {
  //       return {
  //         ...attendanceMarking,
  //         cell1: absentValue,
  //       };
  //     });
  //     console.log(attendanceMarking);
  //   }

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
            checked={attendanceMarking.cell1 === 1}
            onChange={Change}
          />
          <label for="present">Present</label>

          <input
            type="radio"
            id="absent"
            name="attendance"
            value="0"
            checked={attendanceMarking.cell1 === 0}
            onChange={Change}
          />
          <label for="absent">Absent</label>

          <button type="submit">Submit</button>
        </form>
        <p>
          Selected <strong>{attendanceMarking.cell1}</strong>
        </p>
      </div>
    </div>
  );
}

export default Attendance;

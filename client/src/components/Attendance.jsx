import React from "react";

function Attendance() {
  const [attendanceMarking, setAttendanceMarking] = React.useState({
    cell1: 1,
  });

  function PresentChange(event) {
    console.log(event.target.value);

    setAttendanceMarking((attendanceMarking) => {
      return {
        ...attendanceMarking,
        cell1: 1,
      };
    });
    console.log(attendanceMarking);
  }

  function AbsentChange(event) {
    console.log(event.target.value);
    setAttendanceMarking((attendanceMarking) => {
      return {
        ...attendanceMarking,
        cell1: 0,
      };
    });
    console.log(attendanceMarking);
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
            checked
            onChange={PresentChange}
          />
          <label for="present">Present</label>

          <input
            type="radio"
            id="absent"
            name="attendance"
            value="0"
            onChange={AbsentChange}
          />
          <label for="absent">Absent</label>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Attendance;

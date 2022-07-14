import React from "react";

function Attendance() {
  return (
    <form>
      <h4>Name</h4>
      <h4>Roll Number</h4>
      <div>
        <input
          type="radio"
          id="present"
          name="attendance"
          value="present"
          checked
        />
        <label for="present">Present</label>

        <input type="radio" id="absent" name="attendance" value="absent" />
        <label for="absent">Absent</label>
      </div>
    </form>
  );
}

export default Attendance;

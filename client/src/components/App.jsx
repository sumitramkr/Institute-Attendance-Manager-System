import React, { useState } from "react";
import Attendance from "./Attendance";
import CreateColumn from "./CreateColumn";

function App() {
  let [val1, setVal1] = useState("0");
  let [val2, setVal2] = useState("0");
  let [secName, setSecName] = useState("");
  let [goAttendance, setGoAttendance] = useState(0);
  return (
    <div>
      {goAttendance === 0 && (
        <CreateColumn
          val1={val1}
          val2={val2}
          setVal1={setVal1}
          setVal2={setVal2}
          secName={secName}
          setSecName={setSecName}
          setGoAttendance={setGoAttendance}
        />
      )}
      {goAttendance === 1 && (
        <Attendance
          secName={secName}
          goAttendance={goAttendance}
          setSecName={setSecName}
        />
      )}
    </div>
  );
}

export default App;

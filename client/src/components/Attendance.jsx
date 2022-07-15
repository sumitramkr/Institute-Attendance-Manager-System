import React, { useState, useEffect } from "react";
import Axios from "axios";

function Attendance() {
  const [attedanceList, setAttedanceList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:9000/attendance").then((response) => {
      setAttedanceList(response.data.data.values);
    });
  }, []);

  function changeValue(event, index) {
    const checked = event.target.checked;

    setAttedanceList((attedanceList) => {
      const newAttedanceList = [...attedanceList];
      newAttedanceList[index][2] = checked ? "1" : "0";
      return newAttedanceList;
    });
  }

  function sendAllValues(event) {
    Axios.post("http://localhost:9000/attendance", { attedanceList });
    event.preventDefault();
  }

  return (
    <form>
      {attedanceList.map((val, index) => {
        if (index !== 0) {
          let present = "present" + index;
          return (
            <div key={index}>
              {val[0]} {val[1]}
              <input
                type="checkbox"
                id={present}
                name={present}
                value={val[1]}
                checked={val[2] === "1"}
                onChange={(event) => changeValue(event, index)}
              />
              <label for={present}>Attendance</label>
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

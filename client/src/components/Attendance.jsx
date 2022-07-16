import React, { useState, useEffect } from "react";
import Axios from "axios";
import TableTitle from "./TableTitle";

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

  function marking(val) {
    return val == 1 ? "Present" : "Absent";
  }

  function sendAllValues(event) {
    Axios.post("http://localhost:9000/attendance", { attedanceList });
    event.preventDefault();
  }

  return (
    <form>
      <TableTitle />
      {attedanceList.map((val, index) => {
        let present = "present" + index;
        if (index !== 0) {
          return (
            <div key={index} className="row">
              <div className="col-lg-3 col-md-3 col-sm-3">{val[0]}</div>
              <div className="col-lg-3 col-md-3 col-sm-3">{val[1]}</div>
              <div className="col-lg-3 col-md-3 col-sm-3">
                {marking([val[2]])}
              </div>
              <div className="col-lg-3 col-md-3 col-sm-3">
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
            </div>
          );
        }
      })}
      <div className="submit-btn">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={sendAllValues}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default Attendance;

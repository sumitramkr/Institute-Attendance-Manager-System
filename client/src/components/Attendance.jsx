import React, { useState, useEffect } from "react";
import Axios from "axios";
import TableTitle from "./TableTitle";
import Pagination from "./Pagination";

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
      <Pagination
        data={attedanceList}
        changeValue={changeValue}
        marking={marking}
      />
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

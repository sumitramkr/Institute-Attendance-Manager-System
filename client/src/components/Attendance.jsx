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

  function sendAllValues(event) {
    Axios.post("http://localhost:9000/attendance", { attedanceList });
    event.preventDefault();
  }

  return (
    <form>
      <TableTitle />
      <Pagination data={attedanceList} />
      <div className="submit-btn d-grid gap-2 d-md-flex justify-content-md-center">
        <button
          type="submit"
          className="btn btn-lg btn-primary"
          onClick={sendAllValues}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default Attendance;

import React, { useState, useEffect } from "react";
import Axios from "axios";
import TableTitle from "./TableTitle";
import Pagination from "./Pagination";

function Attendance() {
  const [attedanceList, setAttedanceList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:9000/attendance")
      .then((response) => {
        console.log(response.data.data.values);
        setAttedanceList(response.data.data.values);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  }, []);

  // console.log(attedanceList);

  function sendAllValues(event) {
    console.log("Reached Till post React");
    Axios.post("http://localhost:9000/attendance", { attedanceList });
    // event.preventDefault();
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

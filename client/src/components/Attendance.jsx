import React, { useState, useEffect } from "react";
import Axios from "axios";
import TableTitle from "./TableTitle";
import Pagination from "./Pagination";
import "./styles.css";

function Attendance({ secName, setSecName }) {
  const [attedanceList, setAttedanceList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:9000/attendance/" + secName).then(
      (response) => {
        setAttedanceList(response.data.data.values);
      }
    );
  }, []);

  function sendAllValues(event) {
    console.log("Reached Till post React");
    Axios.post("http://localhost:9000/attendance" + secName, { attedanceList });
    // event.preventDefault();
  }

  return (
    <form className="form-body">
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

import React, { useState, useEffect } from "react";
import Axios from "axios";
import TableTitle from "./TableTitle";
import Pagination from "./Pagination";

function Attendance({ secName, setHome }) {
  const [attedanceList, setAttedanceList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:9000/attendance/" + secName).then(
      (response) => {
        setAttedanceList(response.data.data.values);
      }
    );
  }, []);

  function sendAllValues(event) {
    Axios.post("http://localhost:9000/attendance" + secName, { attedanceList });
    event.preventDefault();
  }

  function sentToHome() {
    setHome(1);
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
        <button
          type="submit"
          className="btn btn-lg btn-danger"
          onClick={sentToHome}
        >
          Home
        </button>
      </div>
    </form>
  );
}

export default Attendance;

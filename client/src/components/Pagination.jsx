import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

function Pagination(props) {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  function marking(val) {
    return val == 1 ? "Present" : "Absent";
  }

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage + 1;
    setCurrentItems(props.data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(props.data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, props.data]);

  function changeValue(event, index) {
    const checked = event.target.checked;

    setCurrentItems((currentItems) => {
      const newAttedanceList = [...currentItems];
      newAttedanceList[index][2] = checked ? "1" : "0";
      return newAttedanceList;
    });
  }

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % props.data.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <div>
        {currentItems.map((val, index) => {
          let present = "present" + index;
          if (index !== 0) {
            return (
              <div key={index} className="row">
                <div className="col-lg-3 col-md-3 col-sm-3">
                  {index + itemOffset}
                </div>
                <div className="col-lg-3 col-md-3 col-sm-3">{val[0]}</div>
                <div className="col-lg-3 col-md-3 col-sm-3">{val[1]}</div>

                <div className="col-lg-3 col-md-3 col-sm-3 form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={present}
                    name={present}
                    value={val[1]}
                    checked={val[2] === "1"}
                    onChange={(event) => changeValue(event, index)}
                  />
                  <label className="form-check-label" for={present}>
                    {marking([val[2]])}
                  </label>
                </div>
              </div>
            );
          }
        })}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </>
  );
}

export default Pagination;

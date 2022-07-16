import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

function Pagination(props) {
  //   const [data] = props.;

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(props.data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(props.data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, props.data]);

  // Invoke when user click to request another page.
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
                <div className="col-lg-4 col-md-4 col-sm-4">{val[0]}</div>
                <div className="col-lg-4 col-md-4 col-sm-4">{val[1]}</div>

                <div className="col-lg-4 col-md-4 col-sm-4 form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={present}
                    name={present}
                    value={val[1]}
                    checked={val[2] === "1"}
                    onChange={(event) => props.changeValue(event, index)}
                  />
                  <label className="form-check-label" for={present}>
                    {props.marking([val[2]])}
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

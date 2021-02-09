import React from "react";
import Button from "./Button";

import "./Pagination.css";

const Pagination = ({
  gotoPage,
  canPreviousPage,
  previousPage,
  nextPage,
  canNextPage,
  pageCount,
  pageSize,
  pageIndex,
  pageOptions,
  setPageSize,
}) => (
  <div className="pagination-container">
    <div className="pagination">
      <Button
        onClick={() => gotoPage(0)}
        disabled={!canPreviousPage}
        text="<<"
      />
      <Button onClick={previousPage} disabled={!canPreviousPage} text="<" />
      <Button onClick={nextPage} disabled={!canNextPage} text=">" />
      <Button
        onClick={() => gotoPage(pageCount - 1)}
        disabled={!canNextPage}
        text=">>"
      />
      <span>
        Page{" "}
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>{" "}
      </span>
      <span>
        | Go to page:{" "}
        <input
          className="input"
          type="number"
          defaultValue={pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(page);
          }}
          style={{ width: "100px" }}
        />
      </span>{" "}
      <select
        className="awesome"
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
        }}
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default Pagination;

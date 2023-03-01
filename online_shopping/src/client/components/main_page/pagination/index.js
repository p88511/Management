import { FcPrevious, FcNext } from "react-icons/fc";

import "./index.css";

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className="pagination">
      {
        <button
          className="prev-btn"
          onClick={() => {
            if (currentPage >= 2) {
              setCurrentPage((prevPage) => prevPage - 1);
            }
          }}
        >
          <FcPrevious className="navigateNextIcon" />
        </button>
      }
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            className={page == currentPage ? "active" : ""}
          >
            {page}
          </button>
        );
      })}
      {
        <button
          className="prev-btn"
          onClick={() => {
            if (currentPage < Math.ceil(totalPosts / postsPerPage)) {
              setCurrentPage((prevPage) => prevPage + 1);
            }
          }}
        >
          <FcNext className="navigateNextIcon" />
        </button>
      }
    </div>
  );
  // return (
  //   <div className="pagination">
  //     {
  //       <button
  //         onClick={() => {
  //           if (currentPage >= 2) {
  //             setCurrentPage((prevPage) => prevPage - 1);
  //           }
  //         }}
  //       >
  //       <FcPrevious className="navigateNextIcon" />
  //       </button>
  //     }
  //     {pages.map((page, index) => {
  //       return (
  //         <button
  //           key={index}
  //           onClick={() => setCurrentPage(page)}
  //           className={page == currentPage ? "active" : ""}
  //         >
  //           {page}
  //         </button>
  //       );
  //     })}
  //     {
  //       <button
  //         onClick={() => {
  //           if (currentPage < Math.ceil(totalPosts / postsPerPage)) {
  //             setCurrentPage((prevPage) => prevPage + 1);
  //           }
  //         }}
  //       >
  //        <FcNext className="navigateNextIcon" />
  //       </button>
  //     }
  //   </div>
  // );
};

export default Pagination;

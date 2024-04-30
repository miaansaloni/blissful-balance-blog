import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "../constants.js";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [deletes, setDeletes] = useState(0);
  const [deletingPostId, setDeletingPostId] = useState(null);
  const [lastPage, setLastPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(`${apiUrl}/posts?page=${currentPage}`)
      .then((response) => {
        setLastPage(parseInt(response.headers.get("X-WP-TotalPages")));
        return response.json();
      })
      .then((data) => {
        setPosts(data);
      });
  }, [currentPage, deletes]);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  function generatePagination() {
    let pagination = [];
    for (let index = 1; index <= lastPage; index++) {
      pagination.push({
        n: index,
        active: currentPage === index,
      });
    }
    return pagination;
  }

  const deletePost = async (id) => {
    try {
      setDeletingPostId(id);

      const username = "mia";
      const password = "AZDD z477 7JrW Mxnt um5h Y3uZ";
      const token = btoa(`${username}:${password}`);
      const headers = {
        Authorization: `Basic ${token}`,
      };

      const response = await fetch(`${apiUrl}/posts/${id}`, {
        method: "DELETE",
        headers: headers,
      });
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      if (response.ok) {
        setDeletes(deletes + 1);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setDeletingPostId(null);
    }
  };

  return (
    <>
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            {deletingPostId === post.id ? (
              <div className="spinner-border" role="status"></div>
            ) : (
              <>
                <Link to={`/posts/${post.id}`}>{post.title.rendered}</Link>
                <button className="btn btn-danger" onClick={() => deletePost(post.id)}>
                  Delete
                </button>
                <Link to={`/editpost/${post.id}`} className="btn btn-primary ml-2">
                  Edit
                </Link>
              </>
            )}
          </div>
        ))}
      </div>

      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 && "disabled"}`}>
            <span className="page-link" onClick={() => currentPage !== 1 && changePage(currentPage - 1)}>
              &#8701;
            </span>
          </li>

          {generatePagination().map((page) => (
            <li key={page.n} className={`page-item ${page.active && "active"}`}>
              <span className="page-link" onClick={() => changePage(page.n)}>
                {page.n}
              </span>
            </li>
          ))}

          <li className={`page-item ${currentPage === "lastPage" && "disabled"}`}>
            <span className="page-link" onClick={() => currentPage !== lastPage && changePage(currentPage + 1)}>
              &#8702;
            </span>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Home;

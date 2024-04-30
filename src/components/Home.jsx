import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "../constants.js";
import { Button } from "react-bootstrap";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [deletes, setDeletes] = useState(0);
  const [deletingPostId, setDeletingPostId] = useState(null);
  const [lastPage, setLastPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(`${apiUrl}/posts?page=${currentPage}`)
      .then((response) => {
        setLastPage(parseInt(response.headers.get("X-WP-TotalPages")));
        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
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
      {loading && <div>Loading...</div>}
      <div>
        {posts.map((post) => (
          <div className="mb-3 article" key={post.id}>
            {deletingPostId === post.id ? (
              <div className="spinner-border" role="status"></div>
            ) : (
              <>
                <h5
                  className="text-capitalize d-flex align-items-center justify-content-between"
                  to={`/posts/${post.id}`}
                >
                  {post.title.rendered}{" "}
                  <span className="fs-6 fw-lighter">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </h5>
                <p className="fw-lighter" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                <div className="text-capitalize d-flex align-items-center justify-content-between">
                  <Link className="text-decoration-underline" to={`/posts/${post.id}`}>
                    Read more
                  </Link>
                  <div>
                    <Button className="btn btn-danger" onClick={() => deletePost(post.id)}>
                      Delete
                    </Button>
                    <Button variant="primary" className="ml-2" as={Link} to={`/editpost/${post.id}`}>
                      Edit
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      {/* PAGINATION */}
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

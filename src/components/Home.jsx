import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "../constants.js";
import { Button, Modal } from "react-bootstrap";
import { Trash3 } from "react-bootstrap-icons";
import { PenFill } from "react-bootstrap-icons";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [deletes, setDeletes] = useState(0);
  const [deletingPostId, setDeletingPostId] = useState(null);
  const [lastPage, setLastPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

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

  const deletePost = async () => {
    try {
      const id = postToDelete;
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
      setPostToDelete(null);
      setShowConfirmationModal(false);
    }
  };

  const handleShowConfirmationModal = (postId) => {
    setShowConfirmationModal(true);
    setPostToDelete(postId);
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
    setPostToDelete(null);
  };

  return (
    <>
      {loading && <div>Loading...</div>}
      <div id="article-container">
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
                  <span className="fs-6">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </h5>
                <p className="fw-lighter fst-italic" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                <div className="text-capitalize d-flex align-items-center justify-content-between">
                  <Link className="text-decoration-underline fw-bold read-more" to={`/posts/${post.id}`}>
                    Read more
                  </Link>
                  <div>
                    <Button id="editPostBTN" as={Link} to={`/editpost/${post.id}`}>
                      <PenFill className="mb-1" /> Edit
                    </Button>
                    <Button id="deletePostBTN" onClick={() => handleShowConfirmationModal(post.id)}>
                      <Trash3 className="mb-1" /> Delete
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* MODALE DI CONFERMA PER L'ELIMINAZIONE */}
      <Modal show={showConfirmationModal} onHide={handleCloseConfirmationModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmationModal}>
            Cancel
          </Button>
          <Button variant="outline-danger" onClick={deletePost}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

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

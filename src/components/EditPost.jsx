import { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { apiUrl } from "../constants.js";

const EditPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${apiUrl}/posts/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const data = await response.json();
        setPost(data);
        setTitle(data.title.rendered);
        setContent(data.content.rendered);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const username = "mia";
      const password = "AZDD z477 7JrW Mxnt um5h Y3uZ";
      const token = btoa(`${username}:${password}`);
      const headers = {
        Authorization: `Basic ${token}`,
        "Content-Type": "application/json",
      };

      const response = await fetch(`${apiUrl}/posts/${id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify({
          title: title,
          content: content,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update post");
      }

      setShowModal(true);
    } catch (error) {
      console.error("Error updating post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Post</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="content">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Enter content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Update"}
        </Button>
      </Form>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Post successfully edited</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your post has been edited successfully.</Modal.Body>
        <Modal.Footer>
          <Link to="/" className="btn btn-secondary">
            Close
          </Link>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditPost;

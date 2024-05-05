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
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
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
        setCategoryId(data.categories);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch(`${apiUrl}/categories`);
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchPost();
    fetchCategories();
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
          categories: [parseInt(categoryId)], // Assuming we send an array of category IDs
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
    <div id="editpost" className="p-3">
      <h2 className="text-center">Edit Post:</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="content" className="mt-3">
          <Form.Label>Content:</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Enter content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="category" className="mt-3">
          <Form.Label>Category:</Form.Label>
          <Form.Control as="select" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <div className="d-flex justify-content-center">
          <Button className="customBTNs" type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Update"}
          </Button>
        </div>
      </Form>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
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

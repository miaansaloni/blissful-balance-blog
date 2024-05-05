import { useState, useEffect } from "react";
import { Form, Button, Modal, FormCheck } from "react-bootstrap";
import { Link } from "react-router-dom";
import { apiUrl } from "../constants.js";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

const username = "mia";
const password = "AZDD z477 7JrW Mxnt um5h Y3uZ";
const token = btoa(`${username}:${password}`);
const headers = {
  Authorization: `Basic ${token}`,
};

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${apiUrl}/categories`, {
          headers: headers,
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${apiUrl}/posts`, {
        method: "POST",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: content,
          status: "publish",
          categories: selectedCategories,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setShowModal(true);
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsLoading(false);
      setTitle("");
      setContent("");
      setSelectedCategories([]);
    }
  };

  // const handleCloseModal = () => {
  //   setShowModal(false);
  // };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setSelectedCategories(value);
  };

  return (
    <div>
      <Container id="newpost" className="p-3">
        <h2>Create New Post</h2>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group controlId="title">
                <Form.Label className="fw-bold">Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required // Required field
                />
              </Form.Group>
              <Form.Group controlId="content">
                <Form.Label className="fw-bold mt-4">Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Enter content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required // Required field
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="categories">
                <Form.Label className="fw-bold">Categories</Form.Label>
                {categories.map((category) => (
                  <FormCheck
                    key={category.id}
                    type="checkbox"
                    id={`category-${category.id}`}
                    label={category.name}
                    value={category.id}
                    checked={selectedCategories.includes(String(category.id))}
                    onChange={handleCategoryChange}
                  />
                ))}
              </Form.Group>

              <Button type="submit" className="customBTNs" disabled={isLoading}>
                {isLoading ? "Loading..." : "Submit"}
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header className="justify-content-center">
          <Modal.Title>Post created successfully!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">Your post has been created successfully :)</Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Link to="/" className="btn customBTNs m-2">
            Close
          </Link>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NewPost;

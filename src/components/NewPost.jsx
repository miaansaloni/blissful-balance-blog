import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { apiUrl } from "../constants.js";

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
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Post created successfully");
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsLoading(false);
      setTitle("");
      setContent("");
    }
  };

  return (
    <div>
      <h2>Create New Post</h2>
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
          {isLoading ? "Loading..." : "Submit"}
        </Button>
      </Form>
    </div>
  );
};

export default NewPost;

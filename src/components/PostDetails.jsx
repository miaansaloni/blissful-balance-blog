import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/dist";
import { apiUrl } from "../constants";
import { Link } from "react-router-dom";

const PostDetails = () => {
  const [post, setPost] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    fetch(`${apiUrl}/posts/${id}?_embed=1`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPost(data);
      });
  }, [id]);

  return (
    post && (
      <>
        <Link to="/" className="text-decoration-underline">
          &#8701; back to all posts
        </Link>
        <h1>{post.title.rendered}</h1>
        {post._embedded["wp:term"] && (
          <div>
            {post._embedded["wp:term"][0].map((category) => (
              <span key={category.id} className="badge rounded-pill text-bg-primary">
                {category.name}
              </span>
            ))}
          </div>
        )}

        <h2>Author: {post._embedded["author"][0].name}</h2>

        <div dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>
      </>
    )
  );
};

export default PostDetails;

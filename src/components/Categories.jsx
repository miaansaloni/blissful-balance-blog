import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiUrl } from "../constants.js";
import { Link } from "react-router-dom";

function Categories() {
  const { id } = useParams();
  const [categoryName, setCategoryName] = useState("");
  const [categoryPosts, setCategoryPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryInfo = async () => {
      try {
        const categoryResponse = await fetch(`${apiUrl}/categories/${id}`);

        if (!categoryResponse.ok) {
          throw new Error("Failed to fetch category information");
        }

        const categoryData = await categoryResponse.json();
        setCategoryName(categoryData.name);

        const allPostsResponse = await fetch(`${apiUrl}/posts`);

        if (!allPostsResponse.ok) {
          throw new Error("Failed to fetch all posts");
        }

        const allPostsData = await allPostsResponse.json();

        const filteredPosts = allPostsData.filter((post) => post.categories.includes(parseInt(id)));
        setCategoryPosts(filteredPosts);
      } catch (error) {
        console.error("Error fetching category posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryInfo();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="article-container mb-3">
      <Link to="/" className="text-decoration-underline">
        &#8701; back to all posts
      </Link>

      <h2 className="text-capitalize">{categoryName}</h2>

      {categoryPosts.length > 0 ? (
        <div>
          {categoryPosts.map((post) => (
            <div className="mb-3 article pb-4" key={post.id}>
              <h5
                className="text-capitalize d-flex align-items-center justify-content-between"
                href={`/posts/${post.id}`}
              >
                {post.title.rendered}{" "}
                <span className="fs-6 fw-lighter">
                  {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </span>
              </h5>
              <p
                className="fw-lighter fst-italic excerpt"
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              />
              <div className="text-end">
                <Link className="read-more" to={`/posts/${post.id}`}>
                  Read more
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No posts under this category yet</p>
      )}
    </div>
  );
}

export default Categories;

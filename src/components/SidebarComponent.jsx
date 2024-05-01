import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "../constants.js";
import { Plus } from "react-bootstrap-icons";

const SidebarComponent = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
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

    fetchCategories();
  }, []);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3>Menu</h3>
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/newpost">
            {" "}
            <Plus className="mb-1 icon-border" size={"23px"} /> Write a new article
          </Link>
        </li>
      </ul>
      <div className="sidebar-header">
        <h3>Browse Categories</h3>
      </div>
      <div className="sidebar-menu d-flex flex-wrap">
        {categories.map((category) => (
          <Link key={category.id} className="text-capitalize category" to={`/categories/${category.id}`}>
            {category.name}
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default SidebarComponent;

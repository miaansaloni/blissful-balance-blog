import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "../constants.js";

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
          <Link to="/newpost">Write a new article</Link>
        </li>
      </ul>
      <div className="sidebar-header">
        <h3>Browse Categories</h3>
      </div>
      <ul className="sidebar-menu">
        {categories.map((category) => (
          <li key={category.id}>
            <Link className="text-capitalize" to={`/categories/${category.id}`}>
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SidebarComponent;

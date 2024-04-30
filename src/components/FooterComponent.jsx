import { Facebook } from "react-bootstrap-icons";
import { TwitterX } from "react-bootstrap-icons";
import { Instagram } from "react-bootstrap-icons";

const FooterComponent = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h4>About Us</h4>
            <p>Your Company Description Here</p>
            <p>Contact: contact@example.com</p>
            <p>Contact: contact@example.com</p>
          </div>
          <div className="col-md-3">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/services">Services</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h4>Follow Us</h4>

            <a href="https://www.facebook.com/example">
              <Facebook />
            </a>

            <a href="https://twitter.com/example">
              <TwitterX />
            </a>

            <a href="https://www.instagram.com/example">
              <Instagram />
            </a>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-12">
            <p>&copy; {new Date().getFullYear()} Your Company Name. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;

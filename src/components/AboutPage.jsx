import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const AboutPage = () => {
  return (
    <div>
      <div className="article-container">
        <h3 className="text-center mb-4">About us</h3>
        <p>
          Welcome to [Blog Name], your go-to destination for [insert blog focus or niche]. We're thrilled to have you
          here and can't wait to share our passion for [insert blog topic or theme] with you.
        </p>
        <h4>Who We Are</h4>
        <p>
          We are a team of avid writers, researchers, and enthusiasts who are deeply passionate about [insert blog topic
          or niche]. Our diverse backgrounds and experiences come together to create a dynamic and engaging platform for
          exploring [insert blog focus].
        </p>
        <h4>What we do</h4>
        <p>
          At [Blog Name], we strive to provide our readers with insightful, informative, and entertaining content. From
          in-depth articles and thought-provoking essays to helpful tips and inspiring stories, we cover a wide range of
          topics within [insert blog niche]. Our goal is to [insert main objective or purpose].
        </p>
        <h4>Our Mission</h4>
        <p>
          Our mission is to [insert mission statement or objective]. Through our content, we aim to [insert impact or
          result]. We believe in the power of [insert belief or value] and are committed to [insert commitment or
          promise].
        </p>
        <h4>Why Read Us</h4>
        <p>
          Choosing to read [Blog Name] means gaining access to:
          <ul>
            <li>[insert reason 1]</li>
            <li>[insert reason 2]</li>
            <li>[insert reason 3]</li>
          </ul>
        </p>
      </div>
    </div>
  );
};
export default AboutPage;

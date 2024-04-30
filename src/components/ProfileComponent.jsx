import { Card, Button } from "react-bootstrap";
import { PersonCircle } from "react-bootstrap-icons";

const ProfileComponent = ({ user }) => {
  return (
    <Card>
      <Card.Body>
        <div className="text-center mb-4">
          <PersonCircle size={100} />
          <h2 className="mt-3">@username</h2>
          <p>user@email.com</p>
        </div>
        <div>
          <h5>Profile Information</h5>
          <p>Name Surname</p>
          <p>Location</p>
          <p>Joined</p>
        </div>
        <Button variant="primary">Edit Profile</Button>
      </Card.Body>
    </Card>
  );
};

export default ProfileComponent;

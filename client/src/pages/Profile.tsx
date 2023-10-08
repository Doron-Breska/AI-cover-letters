import UpdateUser from "../components/UpdateUser";
import UserProfile from "../components/UserProfile";

// type Props = {}

const Profile = () => {
  return (
    <div className="profile-page">
      <UserProfile />
      <hr />
      <hr />
      <hr />
      <UpdateUser />
    </div>
  );
};

export default Profile;

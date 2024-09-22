import { UserProfile } from "@clerk/nextjs";

const ProfilePage = () => {
  return (
    <div>
      {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"> */}
      <UserProfile routing="hash" />
    </div>
  );
};

export default ProfilePage;

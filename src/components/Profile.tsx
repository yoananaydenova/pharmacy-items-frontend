import { useEffect, useState } from "react";
import { request, setAuthHeader } from "../helpers/axios_helper";

type ProfileData = {
  firstName: string;
  lastName: string;
  login: string;
};

const ProfileDataPlaceholder: ProfileData = {
  firstName: "",
  lastName: "",
  login: "",
}

const Profile = () => {

  const [profileData, setProfileData] = useState<ProfileData>(ProfileDataPlaceholder);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    request(
      "GET",
      "/profile",
      {},
      {}
    ).then(
      (response) => {
        setProfileData(response.data)
      }).catch(
        (error) => {
          if (error.response.status === 401) {
            setAuthHeader(null);
          }

        }
      );
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    let { name, value } = e.target;

    setProfileData({ ...profileData, [name]: value })
  }

  return (
    <div >
      <h3 className="card-header bg-light mb-3">Profile Information</h3>

      <div className="form-floating mb-3">
        <input onChange={onInputChange} name="login" value={profileData.login} type="text" className="form-control" id="inputUsername" placeholder="username123" />
        <label htmlFor="inputUsername">Username</label>
      </div>

      <div className="form-floating mb-3">
        <input onChange={onInputChange} name="firstName" value={profileData.firstName} type="text" className="form-control" id="inputFirstName" placeholder="John" />
        <label htmlFor="inputFirstName">First name</label>
      </div>

      <div className="form-floating mb-3">
        <input onChange={onInputChange} name="lastName" value={profileData.lastName} type="text" className="form-control" id="inputLastName" placeholder="Doe" />
        <label htmlFor="inputLastName">Last name</label>
      </div>

    </div>
  )
}

export default Profile
import { useEffect, useState } from "react";
import { request, setAuthHeader } from "../helpers/axios_helper";
import toast from "react-hot-toast";

type ProfileData = {
  firstName: string;
  lastName: string;
  login: string;
  password: string;
};

const ProfileDataPlaceholder: ProfileData = {
  firstName: "",
  lastName: "",
  login: "",
  password: "******"
}

type ProfileProps = {
  logout: () => void
}

const Profile = ({ logout }: ProfileProps) => {

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

  const editProfile = () => {

    request(
      "POST",
      "/profile",
      {},
      profileData
    ).then(
      (response) => {

        setAuthHeader(response.data.token);
        toast.success("The profile was uccessfully edited!");

      }).catch(
        (error) => {

          if (error.response.status === 401) {
            console.log('error.response', error.response)
            logout();
            toast.error("The user was logged out!");
          } else {
            toast.error(error.response.data.message);
          }
        }
      );
  }

  return (
    <div >
      <h3 className="card-header bg-light mb-3">Profile Information</h3>

      <div className="form-floating mb-3">
        <input onChange={onInputChange} name="firstName" value={profileData.firstName} type="text" className="form-control" id="inputFirstName" placeholder="John" />
        <label htmlFor="inputFirstName">First name</label>
      </div>

      <div className="form-floating mb-3">
        <input onChange={onInputChange} name="lastName" value={profileData.lastName} type="text" className="form-control" id="inputLastName" placeholder="Doe" />
        <label htmlFor="inputLastName">Last name</label>
      </div>

      <div className="form-floating mb-3">
        <input onChange={onInputChange} name="login" value={profileData.login} type="text" className="form-control" id="inputUsername" placeholder="username123" />
        <label htmlFor="inputUsername">Username</label>
      </div>

      <div className="form-floating mb-3">
        <input onChange={onInputChange} name="password" value={profileData.password} type="password" className="form-control" id="inputPassword" placeholder="username123" />
        <label htmlFor="inputPassword">Password</label>
      </div>

      <button onClick={() => editProfile()} className="btn btn-outline-success py-2 mb-3">
        Edit
      </button>

    </div>
  )
}

export default Profile
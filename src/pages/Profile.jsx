import React, { useState } from "react";
import { firebaseAuth } from '../utils/firebase_config';
import { onAuthStateChanged, signOut } from "firebase/auth";
import PlansScreen from "../components/PlansScreen";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Profile() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [email, setEmail] = useState(undefined);
  const navigate = useNavigate();

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
}

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if(currentUser) setEmail(currentUser.email);
    else navigate("/login");
})

  return (
    <Container>
    <div className="profileScreen">
      <Navbar isScrolled={isScrolled}/>
      <div className="profileScreen_body">
        <h1>Edit Profile</h1>
        <div className="profileScreen_Info">
          <img
            src="https://static.vecteezy.com/system/resources/previews/013/659/682/original/human-avatar-user-ui-account-square-clip-art-icon-vector.jpg"
            alt="profile logo"
          />
          <div className="profileScreen_details">
            <h2>{email}</h2>
            <div className="profileScreen_plans">
              <h3>Plans</h3>
              <PlansScreen />
              <button
                onClick={() => signOut(firebaseAuth)}
                className="profileScreen_signOut"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Container>
  );
}

export default Profile;

const Container = styled.div`
.profileScreen {
  padding-top: 100px;
  height: 100vh;
  color: white;
}

.profileScreen_body {
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  max-width: 800px;
}
.profileScreen_Info {
  display: flex;
}

.profileScreen_details {
  color: white;
  margin-left: 25px;
  flex: 1;
}

.profileScreen_body > h1 {
  font-size: 60px;
  font-weight: 400;
  border-bottom: 1px solid #282c2d;
  margin-bottom: 20px;
}

.profileScreen_details > h2 {
  background-color: gray;
  padding: 15px;
  font-size: 15px;
  padding-left: 20px;
}

.profileScreen_signOut {
  padding: 10px 20px;
  font-size: 1rem;
  margin-top: 5%;
  width: 100%;
  color: #fff;
  background-color: #e50914;
  font-weight: 600;
  border: none;
  cursor: pointer;
}

.profileScreen_plans {
  margin-top: 20px;
}

.profileScreen_plans > h3 {
  border-bottom: 1px solid #282c2d;
  padding-bottom: 10px;
}

.profileScreen_Info > img {
  height: 100px;
}


`;
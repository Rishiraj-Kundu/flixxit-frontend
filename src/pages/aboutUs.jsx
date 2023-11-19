import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Navbar from '../components/Navbar';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase_config';
import { useNavigate } from 'react-router-dom';

export default function AboutUs() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [name, setName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    (() => onAuthStateChanged(firebaseAuth, (currentUser) => {
      if(currentUser) setUserEmail(currentUser.email);
      else navigate("/login");
  }))();
  }, [])

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    }

    function setVal() {
        setName("");
        setQuery("");
    }

    return (
      <Container>
        <div>
            <Navbar isScrolled={isScrolled}/>
            <div className= "aboutUs">
                <h1>About Us</h1>
                <p>Hi I am Rishiraj Kundu and this Web application is my brainchild. I have built this project based on my knowledge of MERN stack. This application provides you with fatures like, genre specific movies and tv shows, trending & top rated movies, adding movies to your watchlist etc. You can use any random email to create an account and login. As per the payment page use the test card number <strong>4242 4242 4242 4242</strong> with any random name and cvv number to check the working. Hope you love the experience!</p>
            </div>
    <div className="form-container">
        <h1>Help Desk</h1>
      <div className="form-fields">
        <div className="field-holder">
          <span className="label"><h2>Email</h2></span>
          <input type = "email"
            value={userEmail}
          />
        </div>
        <div className="field-holder">
        <span className="label"><h2>Name</h2></span>
          <input value = {name}
            onChange={evt => setName(evt.target.value)}
          />
        </div>
        <div className="field-holder">
          <span className="label"><h2>Query</h2></span>
          <textarea
            value={query}
            onChange={evt => setQuery(evt.target.value)}
          />
        </div>
      </div>
      <div className="output">
        <div className="ot-field bold">Email: {userEmail}</div>
        <div className="ot-field bold">Name: {name}</div>
        <div className="ot-field bold">Query: {query}</div>
        <div className="sent"><button onClick= {setVal}>Send</button></div>
      </div>
    </div>
    </div>
    </Container>
  );
};

const Container = styled.div`
.aboutUs{
  color: #fff;
  position: absolute;
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 500px;
  /* height: 663px; */
  top: 100px;
  margin: 20px 20px 20px 20px;
  padding: 10px;
}
.form-container {
  color: #fff;
  position: absolute;
  border: 1px solid rgba(0, 0, 0, 0.2);
  width: 370px;
  height: 663px;
  top: 100px;
  right: 50px;
  margin: auto;
  padding: 10px;
}

.form-fields {
  position: absolute;
  /* background-color: rgb(255, 255, 255); */
  /* left: 10px; */
  height: 300px;
  width: 370px;
  /* box-sizing: border-box; */
  padding: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
}

.output {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  /* box-sizing: border-box; */
  height: 350px;
  width: 370px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  /* left: 10px; */
  top: 370px;
}

.field-holder {
  position: relative;
  padding: 5px;
  margin-bottom: 10px;
}

span {
  font-size: 10px;
}
h1 {
  padding: 5px;
}

input,
select,
textarea {
  padding: 10px;
  font-size: 20px;
  width: 320px;
}

.label {
  position: relative;
  font-size: 12px;
}

.ot-field {
  position: relative;
  color: #fff;
  font-size: 17px;
  padding: 5px;
}

.bold {
  font-weight: bold;
}

.red {
  border: 1px solid red;
}

.sent > button{
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


`;
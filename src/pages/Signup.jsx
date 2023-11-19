import {createUserWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import React, { useState } from 'react';
import styled from "styled-components";
import background from '../assets/bgImg.jpg';
import Header from '../components/Header';
import {firebaseAuth} from "../utils/firebase_config";
import {Navigate, useNavigate} from "react-router-dom";

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    })
    const navigate = useNavigate();

    const handleSignIn = async ()=> {
        try {
            const {email, password} = formValues;
            await createUserWithEmailAndPassword(firebaseAuth, email, password);
        }catch(err) {
            console.error(err);
        }
    };

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if(currentUser) navigate("/");
    })
    return (
        <Container showPassword={showPassword}>
            <img src={background} />
            <div className="content">
                <Header login/>
                <div className="body flex column a-center j-center">
                    <div className="text flex column">
                        <h1>Ulimited films, TV programmes and more.</h1>
                        <h4>Watch anywhere. Cancel at anytime.</h4>
                        <h6>Ready to watch? Enter your email & password to create your account</h6>
                    </div>
                    <div className="form">
                        <input type= "email" placeholder= "Email Address" name="email" value= {formValues.email} onChange={(e) => setFormValues({
                            ...formValues,
                            [e.target.name]: e.target.value,
                        })}/>
                        {showPassword && (<input type="password" placeholder='Password' name='password' value= {formValues.password} onChange={(e) => setFormValues({
                            ...formValues,
                            [e.target.name]: e.target.value,
                        })} />)}
                        {!showPassword && (<button onClick={() => setShowPassword(true)}>Get started</button>)}
                    </div>
                    <button onClick = {handleSignIn}>Sign Up</button>
                </div>
                
            </div>
        </Container>
    );
}

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
    
    .body {
        gap: 1rem;
        text-align: center;
        font-size: 1.5rem;
        h1 {
            padding: 0 25rem;
        }
    }
    .form {
        display: grid;
        grid-template-columns: ${({showPassword}) => showPassword ? "1fr 1fr" : "2fr 1fr"};
        width: 60%;
        input {
            color: black;
            border: none;
            padding: 1.5rem;
            font-size: 1.2rem;
            border: 1px solid black;
            &:focus {
                outline: none;
            }
        }
        button {
            padding: 0.5rem 1rem;
            background-color: #e50914;
            border: none;
            cursor: pointer;
            color: white;
            font-weight: bolder;
            font-size: 1.05rem;
        }
    }
    button {
        padding: 0.5rem 1rem;
        background-color: #e50914;
        border: none;
        cursor: pointer;
        color: white;
        border-radius: 0.2rem;
        font-weight: bolder;
        font-size: 1.05rem;
    }
  }
`;

 
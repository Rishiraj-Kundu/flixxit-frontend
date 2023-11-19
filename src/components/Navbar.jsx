import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from "../assets/logo.jpg";
import {FaPowerOff} from "react-icons/fa";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase_config';
import { AiFillRobot } from 'react-icons/ai';

export default function Navbar({isScrolled}) {

    const links = [
        {name: "Home", link: "/home"},
        {name: "TV Shows", link: "/tv"},
        {name: "Movies", link: "/movies"},
        {name: "My List", link: "/mylist"},
        {name: "About Us", link: "/aboutUs"}
    ];

    const navigate = useNavigate();

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if(!currentUser) navigate("/login");
    })

    return (
        <Container>
            <nav className={`flex ${isScrolled ? "scrolled" : ""}`}>
                <div className="left flex a-center">
                   <div className="brand flex a-center j-center">
                      <img onClick = {() => navigate("/home")} src={logo} alt="Logo" />
                   </div>
                   <ul className={`links flex`}>{
                    links.map(({name, link}) => {
                        return (
                            <li key={name}>
                                <Link to={link}>{name}</Link>
                            </li>
                        );
                    })
                   }</ul> 
                </div>
                <div className="right flex a-center">
                    
                    <button onClick={() => signOut(firebaseAuth)}>
                        <FaPowerOff/>
                    </button>
                    <button onClick={() => navigate("/")}>
                        <AiFillRobot/>
                    </button>
                </div>
            </nav>
        </Container>
    );
}

const Container = styled.div`
  .scrolled {
    background-color: black;
  }
  nav {
    position: sticky;
    top: 0;
    height: 6.5rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    z-index: 2;
    padding: 0 4rem;
    align-items: center;
    transition: 0.3s ease-in-out;
    .left {
        gap: 2rem;
        .brand {
            img {
                height: 4rem;
            }
        }
       .links {
        list-style-type: none;
        gap: 2rem;
        li {
            a {
                color: white;
                text-decoration: none
            }
        }
       }
    }
    .right {
        gap: 1rem;
        button {
            background-color: transparent;
            border: none;
            cursor: pointer;
            &:focus {
                outline: none;
            }
            svg {
                color: #f34242;
                font-size: 1.2rem;
            }
        }
            input {
                width: 0;
                opacity: 0;
                visibility: hidden;
                transition: 0.3s ease-in-out;
                background-color: transparent;
                border: none;
                color: white;
                &:focus {
                    outline: none;
                }
            }
        }
    }
  }
`;
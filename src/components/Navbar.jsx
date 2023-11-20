import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from "../assets/logo.jpg";
import {FaPowerOff, FaSearch} from "react-icons/fa";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase_config';
import { AiFillRobot } from 'react-icons/ai';
import { GiHamburgerMenu } from "react-icons/gi";


export default function Navbar({isScrolled}) {

    const links = [
        {name: "Home", link: "/home"},
        {name: "TV Shows", link: "/tv"},
        {name: "Movies", link: "/movies"},
        {name: "My List", link: "/mylist"},
        {name: "About Us", link: "/aboutUs"}
    ];

    const [showSearch, setShowSearch] = useState(false);
    const [inputHover, setInputHover] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
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
                   <ul className={`${menuOpen ? "open" : ""} links flex`}>{
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
                <button className="menu" onClick={() => setMenuOpen(!menuOpen)}>
                    <GiHamburgerMenu />
                   </button>
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
        .menu {
            color: white;
            display: none;
            position: absolute;
            
            right: 0.5rem;
            flex-direction: column;
            justify-content: space-between;
            width: 2.25rem;
            height: 2rem;
            span {
                height: 0.4rem;
                width: 100%;
                background-color: #fff;
                border-radius: 0.2rem;
            }
            svg {
                color: #f34242;
            }
        }
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
        .search {
            display: flex;
            gap: 0.4rem;
            align-items: center;
            justify-content: center;
            padding: 0.2rem;
            padding-left: 0.5rem;
            button {
                background-color: transparent;
                svg {
                    color: white;
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
        .show-search {
            border: 1px solid white;
            background-color: rgba(0, 0, 0, 0.6);
            input {
                width: 100%;
                opacity: 1;
                visibility: visible;
                padding: 0.3rem;
            }
        }
    }
    
  }
  @media (max-width: 786px) {
    nav .right .menu {
        display: flex;
        padding-top: 0.29rem;
        padding-right: 6rem;
        svg {
            color: #f34242;
        }
    }

    nav {
        padding: 0 0.5rem;
    }

    nav ul {
        display: none;
        flex-direction: column;
        width: 100%;
        margin-bottom: 0.25rem;
    }

    nav ul.open {
        background-color: rgba(0, 0, 0, 0.6);
        padding-top: 10.75rem;
        display: flex;
    }

    nav ul li {
        width: 100%;
        text-align: center;
    }

    nav ul li a {
        margin: 0.2rem 0.5rem;
    }
}
`;
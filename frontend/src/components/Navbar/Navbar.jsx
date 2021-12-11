import React from 'react'
import './Navbar.css'
import dark from './dark.jpg'
import { Link } from 'react-router-dom'
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function Navbar() {
    const { user, dispatch } = useContext(Context);
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" })
    }

    return (
        <div className="nav" >
            <div className="left">Blog App</div>
            <div className="center">
                <ul className="navList">
                    <li className="navListItem"><Link className="link" to="/">HOME</Link></li>
                    <li className="navListItem"><Link className="link" to="/write">WRITE</Link></li>
                    <li className="navListItem">
                        {user && <Link className="link" onClick={handleLogout} to="/">LOGOUT</Link>}
                    </li>
                </ul>
            </div>
            <div className="right">
                {
                    user ? <img className="navImg" src={user.profilePicture ? user.profilePicture : dark} alt="d" />
                        : <ul className="navList">
                            <li className="navListItem">
                                <Link className="link" to="/login">LOGIN</Link>
                            </li>
                            <li className="navListItem">
                                <Link className="link" to="/register">REGISTER</Link>
                            </li>
                        </ul>
                }

                <i className="searchIcon fas fa-search"></i>
            </div>
        </div>
    )
}

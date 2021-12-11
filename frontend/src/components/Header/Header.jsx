import React from 'react';
import './Header.css'
import headerImg from './headerImg.jpg'

export default function Header() {
    return (
        <div className="header">
            <div className="headerTitles">
                <span className="titleSm">React App</span>
                <span className="titleLg">Blog</span>
            </div>
            <img className="headerImg" src={headerImg} alt="" />
        </div>
    )
}

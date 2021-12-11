import { useEffect, useState } from 'react'
import './sidebar.css'
import axios from 'axios'
import sideImg from './sidebar.jpg'
import { Link } from 'react-router-dom'

export default function Sidebar() {

    const [cat, setCat] = useState([])

    useEffect(() => {
        const getCat = async () => {
            const Cats = await axios.get("http://localhost:5000/api/categories");
            setCat(Cats.data);
        }
        getCat();
    }, [])

    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT</span>
                <img src={sideImg} alt="" />
                <p>Welcome to my Blog..</p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                    {cat.map(c =>
                        <li key={c._id} className="sideItem">
                            <Link className="link" to={"/?cat=" + c.name}>
                                {c.name}</Link>
                        </li>)}
                </ul>
            </div>
        </div>
    )
}

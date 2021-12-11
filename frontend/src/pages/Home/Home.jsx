import { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css'
import Header from '../../components/Header/Header'
import Posts from '../../components/Posts/Posts'
import Sidebar from '../../components/Sidebar/Sidebar'
import { useLocation } from 'react-router';

export default function Home() {
    const [posts, setPosts] = useState([]);
    const { search } = useLocation();
    console.log(search);
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get("http://localhost:5000/api/posts" + search);
            setPosts(res.data);
        };
        fetchPosts();
    }, [search]);
    return (
        <div>
            <Header />
            <div className="home">
                <Posts posts={posts} />
                <Sidebar />
            </div>
        </div>
    )
}

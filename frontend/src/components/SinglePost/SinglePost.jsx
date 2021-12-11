import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom';
import { Context } from './../../context/Context';
import './Singlepost.css'

export default function SinglePost() {
    const location = useLocation();
    const path = location.pathname.split('/')[2];
    const [singlePost, setSinglePost] = useState([]);

    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("http://localhost:5000/api/posts/" + path);
            setSinglePost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        }
        getPost();
    }, [path])

    const { user } = useContext(Context);
    const PF = "http://localhost:5000/images/"

    async function handleDelete() {
        await axios.delete("http://localhost:5000/api/posts/" + path, { data: { username: user.username } });
        window.location.replace('/');
    }

    //Post Update
    const [updateMode, setUpdateMode] = useState(false);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");

    const handleUpdate = async () => {
        await axios.put("http://localhost:5000/api/posts/" + path, { username: user.username, title, desc });
        setUpdateMode(false);
    }

    return (
        <div className="singlePost">
            <div className="wrapper">
                <img src={singlePost.photo ? PF + singlePost.photo : "https://source.unsplash.com/random"} alt="" className="singleImg" />
                {
                    updateMode ? <input className='singleTitleInput' style={{ textAlign: "center" }} value={title} onChange={(e) => setTitle(e.target.value)} /> :
                        <h1 className="singleTitle">{title}
                            {singlePost.username === user?.username &&
                                <div className="postEdit">
                                    <i className="editIcon far fa-edit" onClick={() => setUpdateMode(true)} />
                                    <i className="editIcon far fa-trash-alt" onClick={handleDelete} />
                                </div>
                            }
                        </h1>
                }
                {!updateMode &&
                    <div className="singlePostInfo">
                        <span className="author">Author:
                            <Link to={"/?user=" + singlePost.username} className="link">
                                <b> {singlePost.username}</b>
                            </Link>
                        </span>
                        <span className="date">{new Date(singlePost.createdAt).toDateString()}</span>
                    </div>
                }
                {updateMode ? <textarea className="singlePostDescInput" value={desc} onChange={(e) => setDesc(e.target.value)} /> :
                    <p className="singlePostDesc">
                        {desc}
                    </p>
                }
                {updateMode && <button className='writeUpdate' onClick={handleUpdate}>Update</button>}
            </div>
        </div>
    )
}

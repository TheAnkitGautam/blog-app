import { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { Context } from '../../context/Context'
import './write.css'
import upImg from './upload.jpg'

export default function Write() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState("");
    const { user } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            desc,
            categories: category
        }

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename;
            try {
                await axios.post("http://localhost:5000/api/upload", data);
            } catch (error) {
                console.log(error);
            }
        }
        try {
            const res = await axios.post("http://localhost:5000/api/posts", newPost);
            window.location.replace("/post/" + res.data._id);
        } catch (error) {
            console.log(error);
        }
    }

    const [cat, setCat] = useState([])
    const [category, setCategory] = useState('Tech')

    useEffect(() => {
        const getCat = async () => {
            const Cats = await axios.get("http://localhost:5000/api/categories");
            setCat(Cats.data);
        }
        getCat();
    }, [])
    
    return (
        <div className="write">
            <img src={file ? URL.createObjectURL(file) : upImg} className="writeImg" alt="" />
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="formGrp">
                    <label htmlFor="fileInput"><i className="addImg fas fa-plus"></i></label>
                    <input type="file" id="fileInput" style={{ display: "none" }} onChange={e => setFile(e.target.files[0])} />
                    <input type="text" placeholder="Title" onChange={e => setTitle(e.target.value)} className="writeInput" autoFocus={true} />
                </div>
                <div className="catSelect">
                    <label htmlFor="cats">Category: </label>
                    <select name="cats" id="cats" value={category} onChange={(e) => setCategory(e.target.value)}>
                        {cat.map(c =>
                            <option key={c._id} value={c.name}>{c.name}</option>
                        )}
                    </select>
                </div>
                <div className="formGrp">
                    <textarea placeholder="Write your blog..." type="text" onChange={e => setDesc(e.target.value)} className="writeInput writeText"></textarea>
                </div>
                <button className="writeSubmit" type="submit">Post</button>
            </form>

        </div>
    )
}

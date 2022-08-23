import axios from 'axios'
import React, { useEffect, useState } from 'react'
const API = `http://localhost:3001/api/sauces`
const headers = { accept: `application/json` }
const id="62ea4822d6c934e7a4859f53"

function ReqGet() {
    const [post, setPost] = useState([]);
    useEffect(() => {
        axios.get(API, { headers })
            .then((res) => {
                setPost(res.data)
            });
    }, []);
    return (
        <div> <ul>
            {post.map((sauce) => (   
                    sauce._id === id && (
                        <li>{sauce.name}</li>
                    )
            ))
            }
            </ul>
        </div>
    )
}

export default ReqGet
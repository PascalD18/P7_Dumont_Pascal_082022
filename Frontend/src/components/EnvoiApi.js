import axios from "axios";
import React from "react";
import { useEffect, useState } from 'react'

const baseURL = `http://localhost:3001/api/sauces/`


//const id = '62ea4822d6c934e7a4859f53'


function Envoiapi() {
    const [envoi, setEnvoi] = useState([]);


    useEffect(() => {

        axios.get(baseURL)
            .then((response) => {
                setEnvoi(response.data);
            });
    }, []);

    function createPost() {
        axios
            .post(`${baseURL}/`, {
                userId:"1",
                name: "Nouveau nom"
            })
            .then((response) => {
                setEnvoi(response.data);
            });
    }

    if (!envoi) return "No post!"

    return (
        <div>
            <h1>{envoi.name}</h1>
            <button onClick={createPost}>Create Post</button>
        </div>
    );
}
export default Envoiapi
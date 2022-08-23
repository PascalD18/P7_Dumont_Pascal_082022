import axios from 'axios'
import React, { useEffect, useState } from 'react'
const API = `http://localhost:3001/api/`
const headers = { accept: `application/json` }

// const [sauces, setSauces] = useState([])
// const test=API
// console.log(test)
function ReqGetv2() {
    const [sauces, setSauces] = useState([]);
    const [itemId, setItemid] = useState('');
    const [counter, setCounter] = useState(0)

    setItemid('62ea4822d6c934e7a4859f53')
    //axios.get(`https://jsonplaceholder.typicode.com/users`)
    useEffect((itemId) => {
        axios.get({ API } + { itemId }, { headers })
            .then((res) => {
                setSauces(res.data)
                setCounter(counter + 1)
            });
    }, [counter]);
    return (
        <div> <ul>
            {sauces._id === itemId && (
                <li>{sauces.name}</li>
            )
            }
            )
        </ul>
        </div>
    )
}

export default ReqGetv2
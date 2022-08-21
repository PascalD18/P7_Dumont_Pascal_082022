import axios from 'axios'
import { useState } from 'react'
import API from './Api';

function ReqGet() {

    const [sauces, setSauces] = useState([])
    //axios.get(`https://jsonplaceholder.typicode.com/users`)
    axios.get(`/`)
        .then(res => {
            setSauces(API.res.data)
            //   this.setState({ sauces });
        })
    return (
        <div>
            <ul>
                {sauces.map(sauce => <li>{sauce.name}</li>)}
            </ul>
        </div>
    )
}

export default ReqGet
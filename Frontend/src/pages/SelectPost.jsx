import Banner from "../components/Banner"
// Selection d'un poste
function SelectPost() {

    // État de navigation transmit au module 'Banner', pour le paramétrage de la mise en forme de ses liens
    sessionStorage.setItem('stateNav', "Post sélectionné")


    const post=JSON.parse(sessionStorage.getItem('Post'))
 
    //},[])

    return (
        <div>
            <div><Banner/></div>
            <div>
                <ul>
                    <h1>{post.lastName}</h1>     
                </ul>
            </div>
        </div>
    )
}

export default SelectPost

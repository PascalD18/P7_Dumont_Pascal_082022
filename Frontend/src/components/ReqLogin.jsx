import axios from 'axios'

function ReqLogin({ email, password, route }) {
    const baseUrlBack = sessionStorage.getItem("baseUrlBack")
    const baseUrl = `${baseUrlBack}${route}`

    const obj = {
        email: email,
        password: password
    }
    axios({
        method: 'post',
        url: baseUrl,
        data: obj
    })
        .then((res) => {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('userId', res.data.userId)

            // MAJ du header en y ajoutant l'autorisation au header de base avec la méthode 'Bearer'
            const baseHeader = JSON.parse(sessionStorage.getItem('baseHeader'))
            const authHeader = baseHeader.push({ Authorization: `Bearer ${res.data.token}` });
            sessionStorage.setItem('authHeader', JSON.stringify(authHeader))
            if (res.request.status === 200) {
                localStorage.setItem('authNav', 'Nav Ok')
                    .catch((err) => { alert(err)});
            }
        })
}
export default ReqLogin
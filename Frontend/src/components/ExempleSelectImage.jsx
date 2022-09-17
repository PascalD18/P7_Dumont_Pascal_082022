
import { useState } from 'react'

function ExpSelectImage() {
    const [image1, setImage1] = useState(null)
    const [image2, setImage2] = useState(null)

    const onImageChangeFileReader = (event) => {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                setImage1(e.target.result);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }
    const onImageChangeURL = (event) => {
        if (event.target.files && event.target.files[0]) {
            // this.setState({
            //   image: URL.createObjectURL(event.target.files[0])
            // });
            setImage2(URL.createObjectURL(event.target.files[0]))

        }
    }
    return (
        <div>
            <div>
                <p>option FileReader</p>
                <input type="file" onChange={onImageChangeFileReader} className="filetype" id="group_image" />
                <img id="target1" src={`${image1}`} alt="avatar2"></img>
                <p>Option URL</p>
                <input type="file" onChange={onImageChangeURL} className="filetype" id="group_image" />
                <img id="target2" src={`${image2}`} alt="avatar2"></img>
            </div>
         </div>
    )
}
export default ExpSelectImage
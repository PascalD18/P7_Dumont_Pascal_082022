
import { useState} from 'react'

const ImageUpLoad = () => {
    const [selectedImage, setSelectedImage] = useState();
  
    const imageChange = (e) => {
      if (e.target.files && e.target.files.length > 0) {
        setSelectedImage(e.target.files[0]);
      }
    };
  
    const removeSelectedImage = () => {
      setSelectedImage();
    };
  
    return (
      <>
        <div>
          <input
            accept="image/*"
            type="file"
            onChange={imageChange}
          />
  
          {selectedImage && (
            <div>
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Thumb"
              />
              <button onClick={removeSelectedImage}>
                Remove This Image
              </button>
            </div>
          )}
        </div>
      </>
    );
  };
export default ImageUpLoad
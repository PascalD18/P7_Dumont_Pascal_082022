

function TestImage () {
    const previewPicture  = (e)=> {

        // e.files contient un objet FileList
        const [picture] = e.files
    
        // "picture" est un objet File
        if (picture) {
    
            // L'objet FileReader
            var reader = new FileReader();
    
            // L'événement déclenché lorsque la lecture est complète
            reader.onload = function (e) {
                // On change l'URL de l'image (base64)
                picture.src = e.target.result
            }
    
            // On lit le fichier "picture" uploadé
            reader.readAsDataURL(picture)
    
        }}

return (


    <form method="post" url="/upload-picture" encType="multipart/form-data" >

    <input type="file" name="picture" onChange={previewPicture} required />

    <button type="submit" >Uploader</button>
    </form>
    )
}
export default TestImage
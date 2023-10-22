document.getElementById("btn-upload-post-img").onclick = () => {
    let http = new XMLHttpRequest(); // create new AJAX request

    http.onreadystatechange = function() {
        if(this.status === 200) {
            document.getElementById("image-status").innerHTML = this.responseText
        } else {
            document.getElementById("image-status").innerHTML = "There is a problem !"
        }
    }

    http.open("POST", "/admin/image-upload");
    let formData = new FormData();

    formData.append("post-image", document.getElementById("upload-img-post").files[0]);
    http.send(formData)
}
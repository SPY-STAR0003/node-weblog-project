
const imageStatus = document.getElementById("image-status");
const image = document.getElementById("upload-img-post");
const uploadBtn = document.getElementById("btn-upload-post-img");
const progressBar = document.getElementById("post-progress-bar");
const progress = document.getElementById("post-progress");
const successBtn = document.getElementById("post-ing-upload-success-btn");

uploadBtn.onclick = () => {
    let http = new XMLHttpRequest(); // create new AJAX request

    http.onreadystatechange = function() {
        imageStatus.innerHTML = this.responseText
    }

    http.upload.onprogress = function(e) {
        if(e.lengthComputable) {
            let result = `${Math.floor(e.loaded/e.total*100)}%`;
            progressBar.innerHTML = result;
            progressBar.style.width = result;
            if(result === "100%") progress.style.display = "none"
        }
    }

    http.open("POST", "/admin/image-upload");
    let formData = new FormData();

    if(image.files.length > 0) {
        progress.style.display = "flex";
        formData.append("post-image", image.files[0]);
        http.send(formData)
    } else {
        imageStatus.innerHTML = "You should upload a picture first !"
    }
}

imageStatus.onclick = e => {
    // console.log(e.target.innerHTML);
    navigator.clipboard.writeText(e.target.innerHTML);

    successBtn.style.display = "block";
    setTimeout(() => {
        successBtn.style.display = "none";
    }, 2000)
}
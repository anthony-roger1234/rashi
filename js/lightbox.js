function openLightbox(src,type){

const box = document.getElementById("lightbox");
const content = document.getElementById("lightboxContent");

content.innerHTML="";

if(type==="image"){

content.innerHTML = `<img src="${src}">`;

}

if(type==="video"){

content.innerHTML = `<video src="${src}" controls autoplay></video>`;

}

box.classList.remove("hidden");

}

document.getElementById("closeLightbox").onclick = () => {

document.getElementById("lightbox").classList.add("hidden");

};

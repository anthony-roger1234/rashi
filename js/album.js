const params = new URLSearchParams(window.location.search);

const albumId = params.get("id");

fetch(`data/media/${albumId}.json`)
.then(res => res.json())
.then(media => {

const grid = document.getElementById("mediaGrid");

media.forEach(item => {

const div = document.createElement("div");

div.className="mediaItem";

if(item.type === "image"){

div.innerHTML =
`<img src="${item.url}" onclick="openLightbox('${item.url}','image')">`;

}

if(item.type === "video"){

div.innerHTML =
`<video src="${item.url}" onclick="openLightbox('${item.url}','video')"></video>`;

}

grid.appendChild(div);

});

});

document.getElementById("exitBtn").onclick = () => {

window.location="index.html";

};

const albumsPerPage = 20;
let currentPage = 1;
let albumData = [];

fetch("data/albums.json")
.then(res => res.json())
.then(data => {

albumData = data;

renderAlbums();

renderPagination();

});

function renderAlbums(){

const grid = document.getElementById("albumGrid");

grid.innerHTML = "";

const start = (currentPage-1) * albumsPerPage;
const end = start + albumsPerPage;

const pageAlbums = albumData.slice(start,end);

pageAlbums.forEach(album => {

const div = document.createElement("div");

div.className="album";

div.innerHTML = `
<img src="${album.preview}">
<h3>${album.title}</h3>
<button class="viewBtn" onclick="openAlbum('${album.id}')">VIEW</button>
`;

grid.appendChild(div);

});

}

function renderPagination(){

const totalPages = Math.ceil(albumData.length / albumsPerPage);

const top = document.getElementById("topPagination");
const bottom = document.getElementById("bottomPagination");

[top,bottom].forEach(container => {

container.innerHTML="";

for(let i=1;i<=totalPages;i++){

const btn = document.createElement("button");

btn.innerText = i;

btn.onclick = () => {

currentPage = i;

renderAlbums();

};

container.appendChild(btn);

}

});

}

function openAlbum(id){

window.location = `album.html?id=${id}`;

}

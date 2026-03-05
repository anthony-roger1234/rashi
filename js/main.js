const PASSWORD = "rashi1234";

// Elements
const passwordOverlay = document.getElementById('password-overlay');
const passwordInput = document.getElementById('password-input');
const passwordBtn = document.getElementById('password-btn');
const passwordMsg = document.getElementById('password-msg');

const mainHeader = document.getElementById('main-header');
const mainContent = document.getElementById('main-content');
const albumList = document.getElementById('album-list');
const albumView = document.getElementById('album-view');
const albumTitle = document.getElementById('album-title');
const mediaContainer = document.getElementById('media-container');
const backBtn = document.getElementById('back-btn');

// Password check
passwordBtn.addEventListener('click', () => {
  if (passwordInput.value === PASSWORD) {
    passwordOverlay.style.display = 'none';
    mainHeader.classList.remove('hidden');
    mainContent.classList.remove('hidden');
  } else {
    passwordMsg.textContent = "Incorrect password!";
  }
});

// Load all albums dynamically from albums/albums.json
function loadAlbums() {
  fetch('albums/albums.json')
    .then(res => res.json())
    .then(albumFiles => {
      albumFiles.forEach(file => {
        fetch(`albums/${file}`)
          .then(res => res.json())
          .then(data => createAlbumCard(data));
      });
    });
}

// Create album card
function createAlbumCard(album) {
  const card = document.createElement('div');
  card.classList.add('album-card');
  card.innerHTML = `
    <img src="${album.cover}" alt="${album.title}">
    <h3>${album.title}</h3>
    <button class="view-btn">VIEW</button>
  `;
  card.querySelector('.view-btn').addEventListener('click', () => showAlbum(album));
  albumList.appendChild(card);
}

// Show album media
function showAlbum(album) {
  albumList.classList.add('hidden');
  albumView.classList.remove('hidden');
  albumTitle.textContent = album.title;
  mediaContainer.innerHTML = '';

  album.media.forEach(item => {
    let element;
    if (item.type === 'image') {
      element = document.createElement('img');
      element.src = item.src;
    } else if (item.type === 'video') {
      element = document.createElement('iframe');
      element.src = item.src;
      element.allow = "autoplay; encrypted-media";
      element.allowFullscreen = true;
    }
    mediaContainer.appendChild(element);
  });
}

// Back to album list
backBtn.addEventListener('click', () => {
  albumView.classList.add('hidden');
  albumList.classList.remove('hidden');
});

// Initialize
loadAlbums();

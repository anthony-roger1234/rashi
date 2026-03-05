const albumList = document.getElementById('album-list');
const albumView = document.getElementById('album-view');
const backBtn = document.getElementById('back-btn');
const albumTitle = document.getElementById('album-title');
const mediaContainer = document.getElementById('media-container');

// Load all album JSON files
const albums = [
  'albums/album1.json',
  'albums/album2.json'
  // Add more here
];

function loadAlbums() {
  albums.forEach(albumPath => {
    fetch(albumPath)
      .then(res => res.json())
      .then(data => {
        const card = document.createElement('div');
        card.classList.add('album-card');
        card.innerHTML = `
          <img src="${data.cover}" alt="${data.title}">
          <h3>${data.title}</h3>
        `;
        card.addEventListener('click', () => showAlbum(data));
        albumList.appendChild(card);
      });
  });
}

function showAlbum(album) {
  albumList.classList.add('hidden');
  albumView.classList.remove('hidden');
  albumTitle.textContent = album.title;
  mediaContainer.innerHTML = '';

  album.media.forEach(item => {
    let element;
    if(item.type === 'image') {
      element = document.createElement('img');
      element.src = item.src;
    } else if(item.type === 'video') {
      element = document.createElement('iframe');
      element.src = item.src;
      element.allow = "autoplay; encrypted-media";
      element.allowFullscreen = true;
    }
    mediaContainer.appendChild(element);
  });
}

backBtn.addEventListener('click', () => {
  albumView.classList.add('hidden');
  albumList.classList.remove('hidden');
});

loadAlbums();

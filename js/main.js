const albumList = document.getElementById('album-list');
const albumView = document.getElementById('album-view');
const albumTitle = document.getElementById('album-title');
const mediaContainer = document.getElementById('media-container');
const backBtn = document.getElementById('back-btn');

// Load all albums from albums.json
fetch('albums/albums.json')
  .then(res => res.json())
  .then(albumFiles => {
    // Fetch all album JSONs in parallel
    return Promise.all(albumFiles.map(file => fetch(`albums/${file}`).then(res => res.json())));
  })
  .then(albums => {
    albums.forEach(album => createAlbumCard(album));
  })
  .catch(err => console.error("Error loading albums:", err));

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

// Show album view
function showAlbum(album) {
  albumList.style.display = 'none';
  albumView.classList.remove('hidden');
  albumTitle.textContent = album.title;
  mediaContainer.innerHTML = '';

  album.media.forEach(item => {
    let element;
    if (item.type === 'image') {
      element = document.createElement('img');
      element.src = item.src;
      element.alt = album.title;
    } else if (item.type === 'video') {
      element = document.createElement('iframe');
      // Ensure YouTube videos use embed URL
      if (item.src.includes("youtube.com/watch")) {
        element.src = item.src.replace("watch?v=", "embed/");
      } else {
        element.src = item.src;
      }
      element.width = "300";
      element.height = "200";
      element.frameBorder = "0";
      element.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      element.allowFullscreen = true;
    }
    mediaContainer.appendChild(element);
  });
}

// Back button
backBtn.addEventListener('click', () => {
  albumView.classList.add('hidden');
  albumList.style.display = 'flex';
});

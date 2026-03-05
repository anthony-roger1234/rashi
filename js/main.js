const albumList = document.getElementById('album-list');
const albumView = document.getElementById('album-view');
const albumTitle = document.getElementById('album-title');
const mediaContainer = document.getElementById('media-container');
const backBtn = document.getElementById('back-btn');
const paginationControls = document.getElementById('pagination-controls');

const lightboxOverlay = document.getElementById('lightbox-overlay');
const lightboxImg = document.getElementById('lightbox-img');
let scale = 1;

const albumsPerPage = 24;
let currentPage = 1;
let allAlbums = [];

// Sample albums - replace with your JSON fetch if needed
function getSampleAlbums() {
  const sampleAlbums = [];
  for (let i = 1; i <= 50; i++) {
    sampleAlbums.push({
      title: `Album ${i}`,
      cover: 'https://via.placeholder.com/220x180?text=Cover+' + i,
      media: [
        { type: 'image', src: 'https://via.placeholder.com/300x200?text=Photo+' + i + '-1' },
        { type: 'image', src: 'https://via.placeholder.com/300x200?text=Photo+' + i + '-2' },
        { type: 'video', src: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
      ]
    });
  }
  return sampleAlbums;
}

// Initialize albums
function initAlbums() {
  allAlbums = getSampleAlbums();
  renderAlbumPage(currentPage);
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

// Render album page
function renderAlbumPage(page) {
  albumList.innerHTML = '';
  const start = (page - 1) * albumsPerPage;
  const end = start + albumsPerPage;
  const albumsToShow = allAlbums.slice(start, end);

  albumsToShow.forEach(album => createAlbumCard(album));
  renderPaginationControls();
  showAlbumList();
}

// Render pagination
function renderPaginationControls() {
  paginationControls.innerHTML = '';
  const totalPages = Math.ceil(allAlbums.length / albumsPerPage);
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.classList.toggle('active', i === currentPage);
    btn.addEventListener('click', () => {
      currentPage = i;
      renderAlbumPage(currentPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    paginationControls.appendChild(btn);
  }
}

// Show album view
function showAlbum(album) {
  albumList.style.display = 'none';
  paginationControls.style.display = 'none';
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

// Show album list
function showAlbumList() {
  albumView.classList.add('hidden');
  albumList.style.display = 'grid';
  paginationControls.style.display = 'block';
}

// Back button
backBtn.addEventListener('click', showAlbumList);

// Lightbox functionality
mediaContainer.addEventListener('click', (e) => {
  if(e.target.tagName === 'IMG') {
    lightboxImg.src = e.target.src;
    scale = 1;
    lightboxImg.style.transform = `scale(${scale})`;
    lightboxOverlay.style.display = 'flex';
  }
});

// Scroll zoom
lightboxOverlay.addEventListener('wheel', (e) => {
  e.preventDefault();
  const delta = e.deltaY < 0 ? 0.1 : -0.1;
  scale += delta;
  scale = Math.min(Math.max(scale, 0.5), 5);
  lightboxImg.style.transform = `scale(${scale})`;
});

// Close lightbox
lightboxOverlay.addEventListener('click', (e) => {
  if(e.target === lightboxOverlay) {
    lightboxOverlay.style.display = 'none';
  }
});
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape') {
    lightboxOverlay.style.display = 'none';
  }
});

// Initialize page
initAlbums();

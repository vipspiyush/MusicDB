document.addEventListener('DOMContentLoaded', () => {
    const addSongBtn = document.getElementById('addSongBtn');
    const listSongsBtn = document.getElementById('listSongsBtn');
    const addSongSection = document.getElementById('addSongSection');
    const listSongsSection = document.getElementById('listSongsSection');
    const songsTableBody = document.querySelector('#songsTable tbody');

    addSongSection.style.display = 'block';
    listSongsSection.style.display = 'none';

    addSongBtn.addEventListener('click', () => {
        addSongSection.style.display = 'block';
        listSongsSection.style.display = 'none';
    });

    listSongsBtn.addEventListener('click', () => {
        addSongSection.style.display = 'none';
        listSongsSection.style.display = 'block';
        fetchSongs(); 
    });

    const addSongForm = document.getElementById('addSongForm');
    addSongForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(addSongForm);
        const songData = {
            title: formData.get('title'),
            artist: formData.get('artist'),
            album: formData.get('album'),
            genre: formData.get('genre')
        };

        try {
            const response = await fetch('/songs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(songData)
            });
            if (response.ok) {
                alert('Song added successfully!');
                addSongForm.reset();
            } else {
                alert('Failed to add song');
            }
        } catch (error) {
            console.error('Error adding song:', error);
        }
    });

    async function fetchSongs() {
        try {
            const response = await fetch('/songs');
            if (response.ok) {
                const songs = await response.json();
                songsTableBody.innerHTML = ''; 
                songs.forEach(song => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${song.title}</td>
                        <td>${song.artist}</td>
                        <td>${song.album || '-'}</td>
                        <td>${song.genre}</td>
                    `;
                    songsTableBody.appendChild(row);
                });
            } else {
                alert('Failed to fetch songs');
            }
        } catch (error) {
            console.error('Error fetching songs:', error);
        }
    }
});

const audio = new Audio(); // Criamos o objeto de áudio de forma mais direta
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const playIcon = document.getElementById('play-icon');

// ATENÇÃO: Os nomes devem ser IDÊNTICOS aos arquivos na pasta 'music'
const songs = [
    'lana del rey - Every man get his wish', 
    'Aaron Smith - Dancin KRONO Remix', 
    'Taylor Swift - Wildest Dreams',
    'Taylor Swift - Daylight'
];

let songIndex = 0;

// Carregar música inicial
loadSong(songs[songIndex]);

function loadSong(song) {
    title.innerText = song;
    // CORREÇÃO: Adicionada a barra '/' após music e o ponto '.' antes de mp3
    audio.src = `./music/${song}.mp3`;
    cover.src = `./img/default-cover.jpg`;

    // Se não tiver foto da música, usa a padrão
    cover.onerror = function() {
        this.src = 'img/default-cover.jpg';
    };
}

function playSong() {
    playBtn.classList.add('play');
    playIcon.classList.remove('fa-play');
    playIcon.classList.add('fa-pause');
    audio.play().catch(error => {
        console.log("Erro ao tocar: O navegador bloqueou o autoplay. Clique na página antes.");
    });
}

function pauseSong() {
    playBtn.classList.remove('play');
    playIcon.classList.remove('fa-pause');
    playIcon.classList.add('fa-play');
    audio.pause();
}

// Evento de Clique
playBtn.addEventListener('click', () => {
    const isPlaying = playBtn.classList.contains('play');
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Mudar música
prevBtn.addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
});

nextBtn.addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
});

// Próxima automática
audio.addEventListener('ended', () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
});
const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));


//localhost:3000/aint
app.get('/player', (req, res) => {
    res.sendFile('player.html');
});

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

//post an /play
app.post('/play', (req, res) => {
    const data = req.body;
    //console.log(data.string);
    addVideo(data.string);
    res.sendStatus(200);
});

//player is finished with video and requests new one
app.post('/next', (req, res) => {
    const string = 'nice bro';
        const data = {string};
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        };

    res.json({string: nextVideo()});
});




// handling playlist
var playlist = new Array(2);
playlist[0] = 'https://www.youtube.com/watch?v=hH9M-m3WD0g';
playlist[1] = 'https://www.youtube.com/watch?v=s3QiLPo0FfA';

var currentlyPlaying = 0;

function addVideo(string) {
   
    if(playlist.includes(string)) {
        return;
    }
    
    playlist.push(string);
    console.log('|Video added to playlist| index: ' + playlist.legth + '  url: ' + string);
}

function nextVideo() {
    currentlyPlaying = currentlyPlaying + 1;
    if(currentlyPlaying >= playlist.length) {
        console.log('von vorne');
        currentlyPlaying = 0;
    }

    return playlist[currentlyPlaying];
}
// end of playlist

app.listen(3000, console.log('listening in 3000'));
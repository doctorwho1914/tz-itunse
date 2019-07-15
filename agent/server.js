const io = require('socket.io')();
const axios = require('axios');

module.exports = () => {

  io.on('connection', socket => {

    socket.on('getMusic', async data => {
      try {

        const res = await Promise.all(data.artistList.map(e => {
          return axios.get('https://itunes.apple.com/search', {
            params: {
              term: e,
              entity: 'musicTrack',
              attribute: 'allArtistTerm',
              limit: 100
            }
          });
        }));

        let songsList = [];
        res.forEach(e => {
          songsList = songsList.concat(e.data.results)
        });

        if (songsList.length) {
          socket.emit(data.userId, getRandom(songsList));

          setInterval(() => {
            socket.emit(data.userId, getRandom(songsList));
          }, data.timer || 5000);
        } else {
          socket.emit(data.userId, 'Not Found');
        }

      } catch (e) {
        console.log(e);
      }
    });

    socket.on('disconnect', () => {
      console.log('disconnect');
    });
  });

  io.listen(3001);

}

function getRandom(songsList) {
  return [
    songsList[parseInt(Math.random() * songsList.length)],
    songsList[parseInt(Math.random() * songsList.length)],
    songsList[parseInt(Math.random() * songsList.length)]
  ]
}

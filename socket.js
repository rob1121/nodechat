const Playlist = require('./playlist');

const io = require('socket.io').listen(8080);

const pl = new Playlist();

const music = io.of('/music').on('connection', (socket) => {
  socket.emit('load music', pl.getAll());

  socket.on('music play', () => {
    music.emit('play', pl.next());
  });

  socket.on('fastforward', (ts) => {
    music.emit('update time', ts);
  });

  socket.on('next', () => {
    music.emit('play', pl.next());
  });

  socket.on('prev', () => {
    music.emit('play', pl.prev());
  });
});

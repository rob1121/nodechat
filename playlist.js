const fs = require('fs');

class Playlist {
  constructor() {
    this.musics = fs.readdirSync('./public/musics');
    this.current = 0;
  }

  current() {
    return {
      title: this.musics[this.current],
      source: `musics/${this.musics[this.current]}`,
    };
  }

  next() {
    this.current += 1;

    return {
      title: this.musics[this.current],
      source: `musics/${this.musics[this.current]}`,
    };
  }

  prev() {
    this.current -= 1;

    return {
      title: this.musics[this.current],
      source: `musics/${this.musics[this.current]}`,
    };
  }

  getAll() {
    return this.musics;
  }
}

module.exports = Playlist;

import React from 'react';
import io from 'socket.io-client';

const music = io.connect('http://192.168.1.8:8080/music');

export default class MxmMusic extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      msg: '',
      isTyping: false,
      messages: [],
      typer: [],
      title: '',
      source: '',
      playlist: [],
    };

    this.select = this.select.bind(this);
    this.play = this.play.bind(this);
    this.renderPlaylist = this.renderPlaylist.bind(this);
  }

  componentDidMount() {
    const audio = document.getElementById('player');
    let ts = 0;
    audio.ontimeupdate = () => {
      if (audio.currentTime > ts + 3) {
        music.emit('fastforward', audio.currentTime);
      }

      ts = audio.currentTime;
    };

    music.on('load music', (pl) => {
      console.log(pl);
      this.setState({ ...this.state, playlist: pl });
    });

    music.on('update time', (time) => {
      audio.currentTime = time;
      audio.oncanplaythrough = audio.play();
    });

    music.on('play', (song) => {
      this.setState({
        ...this.state,
        source: `http://192.168.1.8/music/${song.source}`,
        title: song.title,
      });

      audio.oncanplaythrough = audio.play();
    });
  }

  componentDidUpdate() {
    const audio = document.getElementById('player');
    if (this.state.music) {
      audio.onerror = () => {
        music.emit('stream next', this.state.music);
      };

      audio.onended = () => {
        music.emit('stream next', this.state.music);
      };
    }
  }

  select(e) {
    this.setState({
      ...this.state,
      title: e.target.value,
    });
  }

  play() {
    music.emit('music request', this.state.music);
  }

  renderPlaylist() {
    return this.state.playlist.map(music =>
      (<div className="container" key={music}>
        {music}
      </div>),
    );
  }

  render() {
    const { music, source } = this.state;
    return (
      <div>
        <div className="columns">
          <div className="column">
            Now palying: {this.state.music}
            <br />
            <audio id="player" src={source} controls>
              Your browser does not support the <code>audio</code> element.
              <track />
            </audio>
          </div>
          <div className="column">
            {this.renderPlaylist()}
          </div>
        </div>
      </div>
    );
  }
}

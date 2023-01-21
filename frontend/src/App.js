import React, { Component } from 'react'
// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Button from 'react-bootstrap/Button';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectFile: null,
      imgBefore: null,
      imgAfter: null,
    }
  }

  handleFileInput(e) {
    this.setState({
      selectFile: e.target.files[0],
      imgBefore: URL.createObjectURL(e.target.files[0])
    })
  }

  async handlePost() {
    // const formData = new FormData();
    // formData.append('file', this.state.selectFile);

    try {
      const res = await axios.postForm("/api/invert", {
        "file": this.state.selectFile
      });
      alert('success: ' + res);
      console.log(res)
      // if (res.data) {
      //   this.setState({
      //     imgAfter: URL.createObjectURL(res.data) // bytestream으로 들어옴. 핸들링 필요.
      //   })
      // }
    } catch (err) {
      alert('failed: ' + err);
    }
  }

  render() {
    return (
      <div className="App">
        {/* <header className="App-header"></header> */}
        <nav>
          navigation
          <a href='https://github.com/cheesecat47/CaptureD2L'>CaptureD2L</a>
        </nav>
        <div>
          <input type="file" name="file" onChange={e => this.handleFileInput(e)} />
          <input type="text" name="gamma" />
          <button type="submit" onClick={() => this.handlePost()}>Invert Dark mode to Light!</button>
        </div>
        <div>
          <div id="img_before">
            <img src={this.state.imgBefore} alt="preview-img"></img>
          </div>
          <div id="img_after">

          </div>
        </div>
      </div>
    );
  }
}

export default App;

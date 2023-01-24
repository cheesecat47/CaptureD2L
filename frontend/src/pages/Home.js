import React, { Component } from 'react';
import axios from 'axios';
import MyNav from '../components/Navigation';

class Home extends Component {

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
        try {
            const res = await axios.postForm("/api/invert", {
                "file": this.state.selectFile
            });
            console.log('success: ' + res);
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
            <div>
                <MyNav />
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
    };
};

export default Home;
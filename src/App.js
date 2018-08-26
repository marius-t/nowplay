import React, { Component } from 'react';
import {Twitter} from 'twitter-node-client';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formError: false
    }
    this.saveTweet = this.saveTweet.bind(this);
  }

  saveTweet(e) {
    e.preventDefault();
    const 
      videoUrl = this.refs.videoUrl.value || null,
      videoComment = this.refs.videoComment.value || null;
    
    if( videoUrl && videoComment ) {
      this.setState({formError: false});
      console.log('Post to twitter');
    } else {
      this.setState({formError: true});
    }
  }

  componentDidMount() {
    const twitterData = {
      "consumerKey": "CXVNsTDohsJaIxl0cjpuLKXYr",
      "consumerSecret": "Y49dNi2NPN9vJaPS95QnRLslOqisEuC7v934lHOfN05cVjbtDB",
      "accessToken": "2834545563-QYQqm8hnLPiU3eFyAD8SGtKhfIYW7gMp8fGh8Xd",
      "accessTokenSecret": "SUquQt3XC2ve3IIa8JbwMa4bsRCpZSJuCVKYAXLUTDBBT",
      "callBackUrl": ""
    }

    let tweet = new Twitter(twitterData);

    let a = tweet.getSearch({'q':'#haiku','count': 10}, (e) => {console.log( 'error', e )}, (d) => {console.log('succes', d)});
    console.log(a);
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">#nowplaying in .... </h1>
            <p className="lead">This page shows #nowplaying tweets in .... that contain a youtube link. It also allows you to post a #nowplaying tweet with a YouTube link.</p>
          </div>
        </div>

        <div className="row mt-3 mb-3">
            <form className="form-inline col-12" onSubmit={this.saveTweet}>
              <div className="form-group">
                <label htmlFor="videoUrl">Video URL:</label>
                <input type="text" className="form-control" ref="videoUrl" id="videoUrl" placeholder="http://youtube.com/" />
              </div>
              <div className="form-group">
                <label htmlFor="comment">Comment:</label>
                <input type="text" className="form-control" ref="videoComment" id="comment" placeholder="Comment" />
              </div>
              <button type="submit" className="btn btn-primary"><i className="fa fa-twitter" aria-hidden="true"></i> Tweet to #nowplaying</button>
            </form>
            {
              this.state.formError ?
                <span className="error">Video url and comment are required</span>
              :
                ''
            }
        </div>

        <div className="row">
          <h3 className="col-12">Some video title</h3>
          <div className="col-6">
            <iframe width="100%" src="https://www.youtube.com/embed/eff7CY79rMU" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
          </div>
          <div className="col-6">
            <div className="user-info">
              <img src="https://via.placeholder.com/48x48" className="rounded-circle"/>
              <div className="user-name">
                <span className="name">some name</span>
                <span className="alias">@sometest</span>
              </div>
              <div className="twitter-logo">logo</div>
            </div>

            <div className="user-content">Some test tweet body</div>

            <div className="user-action">
              <div className="tweet-date">2 hours ago</div>
              <div className="tweet-actions">
                <ul>
                  <li><a href="#">r</a></li>
                  <li><a href="#">rr</a></li>
                  <li><a href="#">f</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default App;

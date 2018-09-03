import React, { Component } from 'react';
import axios from 'axios';
import Tweet from './Tweet.js';
import io from 'socket.io-client';

let socketClient = io('https://domaincook.com/');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      formError: false,
      tweets: [],
      location: 'Detecting location ...',
      lat: null,
      long: null,
      postMsg: null
    }
    this.saveTweet = this.saveTweet.bind(this);


  }

  //Check tweet + post for twitter update
  saveTweet(e) {
    e.preventDefault();
    const 
      videoUrl = this.refs.videoUrl.value || null,
      videoComment = this.refs.videoComment.value || null;
    
    if( videoUrl && videoComment ) {
      this.setState({formError: false});
      
      axios({
        method: 'post',
        url: 'https://domaincook.com/',
        params: {
          url: videoUrl,
          comment: videoComment
        }
      })
      .then( res => {
        //If the tweet is posted with success: show message + clear form
        if( res.data.status == 'success' ) {
          this.setState({postMsg: res.data.message});
          this.refs.videoUrl.value = this.refs.videoComment.value = "";
        }
      })
      .catch( err => {
        console.log(err);
      })

    } else {
      this.setState({formError: true});
    }
  }

  //Adding geolocation to componentWillMount - will trigger the location before the FE is rendered
  componentWillMount() {
    //Try to get users location
    if( navigator.geolocation ) {
      navigator.geolocation.getCurrentPosition((geoData) => {
        const 
          lat = geoData.coords.latitude,
          long = geoData.coords.longitude;
        axios({
          method: 'get',
          url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+long+'&sensor=false&key=xxxx&result_type=locality'
        })
        .then(res => {
          if( res.data.results[0].formatted_address ) {
            this.setState({location: res.data.results[0].formatted_address});
          }
        })
        .catch(err => {
          console.log(err);
        });

        this.setState({
          lat: lat,
          long: long
        });
      });
    }

    socketClient.on('new-tweet', (data) => {
      const twitterData = Object.assign([], this.state.tweets);
      
      console.log(twitterData);

      twitterData.unshift(data);
      this.setState({tweets: twitterData});

      console.log(this.state.tweets);
    });
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: 'https://domaincook.com/',
    })
    .then(res => {
      //once the data has been loaded we hide the preloader
      this.setState({loading: false});

      if( Array.isArray(res.data.tweets) ) {
        this.setState({tweets: res.data.tweets});
      }

    })
    .catch(function (error) {
      console.log( 'error', error );
    })
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">#nowplaying in {this.state.location} </h1>
            <p className="lead">This page shows #nowplaying tweets in {this.state.location} that contain a youtube link. It also allows you to post a #nowplaying tweet with a YouTube link.</p>
          </div>
        </div>

        <div className="row mt-3 mb-3">
            <form className="form-inline col-12" onSubmit={this.saveTweet}>
              <div className="form-group mx-5">
                <label htmlFor="videoUrl">Video URL:</label>
                <input type="text" className="form-control" ref="videoUrl" id="videoUrl" placeholder="http://youtube.com/" />
              </div>
              <div className="form-group mx-5">
                <label htmlFor="comment">Comment:</label>
                <input type="text" className="form-control" ref="videoComment" id="comment" placeholder="Comment" />
              </div>
              <button type="submit" className="mx-5 btn btn-primary"><i className="fa fa-twitter" aria-hidden="true"></i> Tweet to #nowplaying</button>
            </form>
            {
              this.state.formError ?
                <span className="error">Video url and comment are required</span>
              :
                ''
            }
        </div>

        {
          this.state.postMsg ?
            <span>{this.state.postMsg}</span>
          :
            ''
        }

        {/* We are adding a preloader. Since the data is loaded on display we know the preloader is needed */}
        {
          this.state.loading ?
            <div className="loading">Loading tweets for #nowplaying ...</div>
          :
            ''
        }

        {/* If we don't have the preloader the data has been loaded but there are no tweets */}
        {
          this.state.tweets.length === 0 && this.state.loading === false ?
            <div className="no-tweets">No tweets found for now playing</div>
          :
            ''
        }

        <Tweet {...this.state}/>

      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import embed from 'embed-video';
import YouTube from 'youtube-node';
import TimeAgo from 'react-timeago';

let youTube = new YouTube();
youTube.setKey('AIzaSyC-D8N4quEnwh00Gt_OyaAkPG50mvdFEto');

class Tweet extends Component {

  render() {
    const 
        tweets = this.props.tweets || [],
        tweetHtml = [];

    tweets.map((tweet, index) => {
        let 
            videoUrl = null,
            videoCode = null,
            videoInfo = null,
            videoTitle = null;

        console.log( tweet );

        //In order to get the tweet with youtube url and ignore the others
        const tweetUrls = tweet.entities.urls.filter(obj => Object.keys(obj).some(key => obj[key].includes('youtu.be') || obj[key].includes('youtube.com')));

        videoUrl = tweetUrls[0].expanded_url || null;
        videoCode = embed(videoUrl, {attr: {width: '100%', height: 300}});
        videoInfo = embed.info(videoUrl);

        if( videoInfo && videoInfo.id ) {
            const youTubeInfo = youTube.getById(videoInfo.id, (err, result) => {
                videoTitle = result.items[0].snippet.title;
            });
        }

        tweetHtml.push(
            <div className="row" key={index}>
                <h3 className="col-12">{videoTitle}</h3>
                <div className="col-6">
                    <div dangerouslySetInnerHTML={{ __html: videoCode }} />
                </div>
                <div className="col-6">
                    <div className="user-info pull-left col-12">
                        <img src={tweet.user.profile_image_url} className="rounded-circle pull-left"/>
                        <div className="user-name pull-left">
                            <span className="name">{tweet.user.name}</span><br/>
                            <span className="alias">@{tweet.user.screen_name}</span>
                        </div>
                        <div className="twitter-logo pull-right"><i className="fa fa-twitter" aria-hidden="true"></i></div>
                    </div>
        
                    <div className="user-content mt-5 col-12">{tweet.text}</div>
        
                    <div className="user-action mt-3 col-12">
                        <TimeAgo date={tweet.created_at} className="pull-left"/>
                        <div className="tweet-actions pull-right">
                        <ul>
                            <li><a href="#"><i className="fa fa-comment" aria-hidden="true"></i></a></li>
                            <li><a href="#"><i className="fa fa-retweet" aria-hidden="true"></i></a></li>
                            <li><a href="#"><i className="fa fa-heart" aria-hidden="true"></i></a></li>
                        </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
        return null; //Array.map needs a return value
    });

    return (
        <div>{tweetHtml}</div>  
    );
  }
}

export default Tweet;

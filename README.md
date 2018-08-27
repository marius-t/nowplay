# now-playing - Showing latest tweets under #nowplaying

Show latest 10 tweets under #nowplaying

The location for twitter has been disabled because tweets with #nowplaying with youtube links from a specific location are not that popular and thus the app will not be so 'impresive'. The missing piece it's just in the request made to the proxy (found here: https://github.com/marius-t/twitter-proxy/ ) that should use the location: 'lat, long) in the request.

The styling it's not the best.

Other issues might be caused by the twitter API error: Limitation

How this should have been: Just one api (no external requests to google and youtube) that would return just the needed data (username, alias, video link, date, video title)


#Connection to twitter is done via a proxy

To review the proxy code please visit: https://github.com/marius-t/twitter-proxy/


# File Streaming: What should have been a great idea

This is a Next.js, Node.js, Firebase, Express app that was intended to allow people to go to a website, enter a room, and then stream a video-file or watch a video file
from another person. I still think this is a good idea, but I couldn't get it to work, and I would like to move on. This will be all the troubles that I encountered with all 
the solutions I attempted.

### Solution 1: Send the video out via WebRTC

This began as a WebRTC project, and still has some WebRTC code here. I wanted to use PeerJS to connect users together, sending out the video file. However, at the time of writing
this, [there is a known bug when trying to captureStream from an HTMLVideoElemet](https://bugs.chromium.org/p/chromium/issues/detail?id=1156408). Simply put, while it __may__ work 
locally, once processed and sent over WebRTC, it ceases to work.

### Solution 2: Break up the video into packets and send them via RTCDataConnection

An idea that hit me in the middle of the night, I thought it could work. So I went to coding, and went to work on it. Immediadtly, a couple issues emerged. The first one,
MediaRecorder can recorded a MediaStream, but every new buffer it creates cannot be turned into an independent video. Instead, the MediaRecourder only creates the video file headers
once - at the very first calling of .requetData(). No problem, I was able to set up a way to generate independent Webm Chunks by creating, calling, and destroying a MediaRecorder 
instance. While this does generate consistent, reliable Webm video that can all be played independently, it requires a ton of hardware resources, AND gets laggy as the video
surpasses 10 mins of playback.

However, lag aside, these Webm Blobs work. I went ahead with the RTCDataConnection route. Using PeerJS - the same library I used previously - I was able to connect people together
once. Almost consistently - no matter how many TURN/STUN servers I added - the peer connection closed every time once the data was sent out. Furthermore, on connections with more
than one person, I could not get the host to send the data packet out to more than one person. Clearly, this didn't work.

### New Approach: Send the data packets to a central server

I knew this would work regaurdless. It's how Twitch, Zoom, Youtube, etc. set up their live streams and host it to thousands. While possible, this is an expensive approach.

### Solution 3: Send the data packets via Socket IO

At the end of the day, this proved to be the most reliable. SocketIO works pretty well, got the packets to the server everytime, and the socket rarely closed. Locally, this was the
solution that worked every time. However, once deployed to Google App Engine, the socket would reliably fail - either through ping timeout or transport closed. While I was able to 
solve the transport close error by increasing the max http buffer size, the ping timeout issue persisted. Furthermore, the lag problem in solution 2 persisted. I could not send data 
efficiently, conssitently, to the server. With a short time inteval in the media recourding, the Google App Engine backend would drop packets, and overall simply drop requests. With a 
long interval, the google app engine could not procese the data in time, causing the socketio to simply ping timeout. Locally promising, but production failing.

### Solution 4: POST the data to the server

While in theory a simple, good idea, it proved to drop packets in both local development and in the google app engine. After 4-6 POSTs, the express server stops processing the requests,
dropping everything after. Data is lost through the massive lagging.

### Solution 5: upload the files directly to Firebase Storage

In general, I knew coming into this project that I wanted to avoud any database access in the frontend. Security reasons, but also I wanted to have it on the backend ONLY for 
code consistentcy and not having to check uploads in two places. As such, I was hesitent to try this. Fortunatly, in the end, I was able to achive my original goal of keeping the
database out of the front end because this ended up not working either. The same issue occured with the POSTing the data: the packets are lost. Maybe sometimes the Webm blob was 
uploaded properly - and in these rare cases it played perfectly, and could be downloaded and processed effectivly - it was simply too unreliable for it to work at all. The frontend
could not keep up with video processing, firebase uploading, and local video playback. 

### Solution 6: SocketIO wrapper clients

I stumbled across two SocketIO libraries that could work, but in the end didn't. One, Socket.io-stream, is several years old at this point, and is too out of date in the modern era.
The other, socket.io-file-upload, I never got it to work in the browser. Or maybe I never got the server to communivate with the frontend. Ether way, these two socketIO libraries 
ended up not working, and at this point I didn't feel like this was work pursuing any further. 

### Conclusion

This was a great project, and taught me a lot about deploying to the Google Cloud Platform - both the front end and the back end. Furthermore, I was able to understand express, sockets,
multer, react, WebRTC, and the modern web API a little better. It was fun, but its time to move on.

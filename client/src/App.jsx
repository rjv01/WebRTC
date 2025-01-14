import { useEffect, useRef, useState } from "react";
import io from 'socket.io-client';
import JoinRoom from "./components/JoinRoom";

const config = {
  iceServers: [
    {
      urls: 'stun:stun.l.google.com:19302' // Google's public STUN server
    }
  ]
};

function App() {
  const [socket,setSocket] = useState(null);
  const [join,setJoin] = useState('');
  const [remoteID,setRemoteID] = useState('');
  const userVideo = useRef(null);
  const remoteVideo = useRef(null);

  const initVideo = async ()=>{
    const stream = await navigator.mediaDevices.getUserMedia({video:true,audio:false});
    if(userVideo.current) userVideo.current.srcObject = stream;
    return stream;
  }

  const handleIceCandidate = async (e)=>{
    try{
        if(e.candidate && socket){
          await socket.emit('icecandidate',e.candidate);
          console.log(`Ice Candidate ${e.candidate}`);
        }
    }catch(e){
      console.log("Error in icecandidate function: ",e);
    }

  }

  const initPeer = async ()=>{
    const peer = new RTCPeerConnection(config);
    const localStream = await initVideo();
    
    localStream.getTracks().forEach((track)=>{
      peer.addTrack(track,localStream);
    });

    peer.ontrack = (e)=>{
      if(remoteVideo.current) remoteVideo.current.srcObject = e.streams[0];
    }

    peer.onicecandidate = handleIceCandidate;

    return peer;

  }

  useEffect(()=>{
    const newsocket = io('http://localhost:5000');

    newsocket.on('userid',rID=>{
      console.log(rID);
      initVideo();
      setRemoteID(rID);
    });


    newsocket.emit('message','raj is op');
    setSocket(newsocket);
    // newsocket.emit('joinRoom',join);

    return ()=>{
      newsocket.disconnect();
    }
  },[remoteID]);

  return (
    <div>
    <JoinRoom join={join} setJoin={setJoin} socket={socket}/>
    <div>
      <div className="flex justify-center items-center ">
        <video className="border rounded-lg m-5 p-5 bg-red-600 w-[500px] h-[400px]" ref={userVideo} autoPlay/>
        <video className="border rounded-lg m-5 p-5 bg-red-600 w-[500px] h-[400px]" ref={userVideo} autoPlay/>
      </div>
    </div>
    </div>
  );
  
}

export default App

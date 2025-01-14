import React from 'react'

export default function JoinRoom(props) {
    const {join,setJoin,socket} = props;

    const handleJoin = (e)=>{
        setJoin(e.target.value);
      }
      
    const handleJoinButton = (e)=>{
       console.log(join);
       socket.emit('joinRoom',join);
       setJoin('');
    }

  return (
    <div>
        <h1 className="text-3xl font-bold mb-5 bg-red-600">Frontend Working</h1>
        <div className="flex flex-col justify-center items-center m-5 p-5 text-2xl">
          <input 
            type="text" 
            placeholder="Enter Room number" 
            className="mb-4 p-2 border rounded-md w-64 text-lg"
            value={join}
            onChange={handleJoin}
          />
          <div className="border bg-blue-400 m-5 p-5 flex gap-5 rounded-md ">
            <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            onClick={handleJoinButton}
            >
              Join Room
              </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Start Call</button>
          </div>
        </div>
    </div>
  )
}

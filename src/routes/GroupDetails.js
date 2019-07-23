import React, { useState, useEffect } from 'react';
import './GroupDetails.css';
import { db } from '../db/firebase';

const User = ({user}) => {
  const iframe = React.createRef();

  useEffect(() => {

      setTimeout(() => {
        if (iframe.current) {
          iframe.current.contentWindow.postMessage(user.html, "*")
        }
      }, 100);

  }, [user, iframe]);

  return <div className="user">
    <div className="user__name">{user.name}</div>
    <div className="user__score">{user.score}</div>
    <iframe title="xxx" ref={iframe} className="user__html" src={process.env.PUBLIC_URL + '/result.html'} frameBorder="0"/>
  </div>
}

const Users = ({currentRoomId}) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (currentRoomId) {
      const unsubscribe = db.collection("room")
        .doc(currentRoomId)
        .collection('users')
        .onSnapshot(function(snapshots) {
          setUsers(snapshots.docs.map((e) => ({ id: e.id, ...e.data()})));
        });
      return () => unsubscribe();
    }
  }, [currentRoomId]);

  return <div className="group-details__users">
    {
      users.map(e => {
        return <User key={e.id} user={e} />
      })
    }
  </div>
}
export function GroupDetails({currentRoomId}) {
  const [room, setRoom] = useState({});

  useEffect(() => {
    if (currentRoomId) {
      const unsubscribe = db.collection("room").doc(currentRoomId)
        .onSnapshot(function(doc) {
          setRoom({ id: doc.id, ...doc.data()});
        });
      return () => unsubscribe();
    }
  }, [currentRoomId]);

  console.log(room);
  return (
    <div className="group-details">
      <div className="group-details__room-name">{room.name}</div>
      <div className="group-details__task" style={{backgroundImage: `url(${room.assetUrl})`}}/>
      <Users currentRoomId={currentRoomId} />
    </div>
  )
}

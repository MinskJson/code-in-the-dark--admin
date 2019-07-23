import React, {useEffect, useState, useCallback} from 'react';
import { GroupDetails } from './routes/GroupDetails';
import { Groups } from './routes/Groups';
import { db } from './db/firebase';

function App() {
  const [rooms, setRooms] = useState([]);
  const [currentRoomId, setCurrentRoomId] = useState();
  const onRoomSelect = useCallback((room) => {
    setCurrentRoomId(room.id);
  }, []);

  useEffect(() => {
    // db.collection("room")
    //   .get().then(function(snapshots) {
    //     console.log(snapshots);
    //     setRooms(snapshots.docs.map((e) => ({ id: e.id, ...e.data()})));
    //   });
    const unsubscribe = db.collection("room")
      .onSnapshot(function(snapshots) {
        setRooms(snapshots.docs.map((e) => ({ id: e.id, ...e.data()})));
      });
    return () => unsubscribe();
  }, []);

  return (
    <div className="app">
      <Groups rooms={rooms} onRoomSelect={onRoomSelect} currentRoomId={currentRoomId} />
      <GroupDetails currentRoomId={currentRoomId} />
    </div>
  );
}

export default App;

import React from "react";
import "./Groups.css";

const Room = ({ room, onRoomSelect, isSelected }) => {
  const onClick = () => {
    onRoomSelect(room);
  };

  return (
    <div className={`room room_${isSelected}`} key={room.id} onClick={onClick}>
      {room.name}
    </div>
  );
};

export function Groups({ rooms, onRoomSelect, currentRoomId }) {
  console.log(rooms);
  return (
    <div className='groups'>
      {rooms.map(e => {
        return <Room key={e.id} room={e} isSelected={currentRoomId === e.id} onRoomSelect={onRoomSelect} />;
      })}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';

function Page() {
  const [roomName, setRoomName] = useState('');
  const [roomSqft, setRoomSqft] = useState(0);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchRoom = async () => {
      const response = await fetch(`/api/rooms/${id}`, {
        method: 'GET',
      });

      console.log(response);

      if (response.ok) {
        const roomData = await response.json();

        setRoomName(roomData.roomName);
      } else {
        console.error(response);
      }
    };

    fetchRoom();
  }, [id]);

  const sendUpdateRoomRequest = async () => {
    const updatedRoom = {
      roomName: roomName,
      roomSqft: roomSqft
    };

    const response = await fetch(`/api/rooms/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedRoom)
    });

    if (response.ok) {
      const createdRoom = await response.json();
      console.log(`Updated room: ${JSON.stringify(createdRoom)}`);

      router.push(`/rooms/${id}`);
    } else {
      console.error(response);
    }
  };

  return (
    <Form className="mt-3">
      <Form.Group controlId="room-name">
        <Form.Label>Room Name</Form.Label>

        <Form.Control
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
      </Form.Group>

      <Button className="mt-3" variant="primary" type="button" onClick={sendUpdateRoomRequest}>
        Submit
      </Button>
    </Form>
  );
};

export default Page;

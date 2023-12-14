import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';

function Page() {
  const [roomName, setRoomName] = useState('');
  const [roomSqft, setRoomSqft] = useState(0);

  const router = useRouter();

  const sendCreateRoomRequest = async () => {
    const newRoom = {
      roomName: roomName,
      roomSqft: roomSqft
    };

    const response = await fetch('/api/rooms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRoom)
    });

    if (response.ok) {
      const createdRoom = await response.json();
      console.log(`Created room: ${JSON.stringify(createdRoom)}`);

      router.push('/rooms');
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

      <Button className="mt-3" variant="primary" type="button" onClick={sendCreateRoomRequest}>
        Submit
      </Button>
    </Form>
  );
};

export default Page;

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';

function Page() {
  const [roomName, setRoomName] = useState('');
  const [roomSqft, setRoomSqft] = useState('');
  const [objectName, setObjectName] = useState('');
  const [objectWidth, setObjectWidth] = useState('');
  const [objectHeight, setObjectHeight] = useState('');
  const [objectSqft, setObjectSqft] = useState('');

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
        setRoomSqft(roomData.roomSqft);
        setObjectName(roomData.objectName);
        setObjectWidth(roomData.objectWidth);
        setObjectHeight(roomData.objectHeight);
        setObjectSqft(roomData.objectSqft);
      } else {
        console.error(response);
      }
    };

    fetchRoom();
  }, [id]);

  const sendUpdateRoomRequest = async () => {
    const updatedRoom = {
      roomName: roomName,
      roomSqft: roomSqft,
      objectName: objectName,
      objectWidth: objectWidth,
      objectHeight: objectHeight,
      objectSqft: objectSqft
    };

    const response = await fetch(`/api/rooms/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedRoom)
    });

    if (response.ok) {
      const createdRoom = await response.json();
      console.log(`Updated user: ${JSON.stringify(createdRoom)}`);

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

      <Form.Group controlId="room-sqft" className="mt-3">
        <Form.Label></Form.Label>
        <Form.Control
          type="text"
          value={roomSqft}
          onChange={(e) => setRoomSqft(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="object-name" className="mt-3">
        <Form.Label>Object Name</Form.Label>
        <Form.Control
          type="text"
          value={objectName}
          onChange={(e) => setObjectName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="object-width" className="mt-3">
        <Form.Label>Object Width</Form.Label>
        <Form.Control
          type="text"
          value={objectWidth}
          onChange={(e) => setObjectWidth(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="object-height" className="mt-3">
        <Form.Label>Object Height</Form.Label>
        <Form.Control
          type="text"
          value={objectHeight}
          onChange={(e) => setObjectHeight(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="object-sqft" className="mt-3">
        <Form.Label>Object Sqft</Form.Label>
        <Form.Control
          type="text"
          value={objectSqft}
          onChange={(e) => setObjectSqft(e.target.value)}
        />
      </Form.Group>

      <Button className="mt-3" variant="primary" type="button" onClick={sendUpdateRoomRequest}>
        Submit
      </Button>
    </Form>
  );
};

export default Page;

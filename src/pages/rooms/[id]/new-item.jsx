import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';
import CalculateSqft  from '@/frontend/components/sqft-calc';

function Page() {
  const [name, setName] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [roomId, setRoomId] = useState('');
  const [room, setRoom] = useState({});
  const [isPaintable, setIsPaintable] = useState('');

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchRoom = async () => {
      const response = await fetch(`/api/rooms/${id}`, {
        method: 'GET',
      });

      console.log(response);

      if (response.ok) {
        // console.log(await response.text());
        const roomData = await response.json();

        setRoom(roomData);
      } else {
        console.error(response);
      }
    };

    fetchRoom();
    setRoomId(id);
  }, [id]);

  const sendCreateItemAddRequest = async () => {

    const newItem = {
      name: name,
      width: width,
      height: height,
      roomId: roomId,
      isPaintable: true
    };

    const response = await fetch(`/api/items?roomId=${room.id}`, { //`/api/rooms/${room.id}/items`
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem)
    });

    if (response.ok) {
      const createdItem = await response.json();
      console.log(`Created item: ${JSON.stringify(createdItem)}`);

      router.push(`/rooms/${id}/items`);
    } else {
      console.error(response);
    }
  };

  const sendCreateItemSubRequest = async () => {

    const newItem = {
      name: name,
      width: width,
      height: height,
      roomId: roomId,
      isPaintable: false
    };

    const response = await fetch(`/api/items?roomId=${room.id}`, { //`/api/rooms/${room.id}/items`
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem)
    });

    if (response.ok) {
      const createdItem = await response.json();
      console.log(`Created item: ${JSON.stringify(createdItem)}`);

      router.push(`/rooms/${id}/items`);
    } else {
      console.error(response);
    }
  };

  return (
    <Form className="mt-3">
      <Form.Group controlId="name">
        <Form.Label>Item Name</Form.Label>

        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="width">
        <Form.Label>Width</Form.Label>

        <Form.Control
          type="text"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="height">
        <Form.Label>Height</Form.Label>

        <Form.Control
          type="text"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </Form.Group>

      <Button
        className="mt-3 me-2"
        variant="primary"
        type="button"
        onClick={sendCreateItemAddRequest}
      >
        Add Sqft
      </Button>

      <Button
        className="mt-3"
        variant="primary"
        type="button"
        onClick={sendCreateItemSubRequest}
      >
        Subtract Sqft
      </Button>

    </Form>
  );
};

export default Page;

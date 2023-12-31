import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';

function Page() {
  const [name, setName] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [roomId, setRoomId] = useState('');
  const [room, setRoom] = useState({});
  const [isPaintable, setIsPaintable] = useState(false);

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

  const sendCreateItemRequest = async () => {

    console.log('isPaintable:', isPaintable);

    const newItem = {
      name: name,
      width: width,
      height: height,
      roomId: roomId,
      isPaintable: isPaintable
    };

    //`/api/rooms/${room.id}/items` for GET --> /api/items?roomId=${room.id}
    const response = await fetch('/api/items', {
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
    console.log('isPaintable:', isPaintable);
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

      <Form.Check
        className="mt-3"
        type="switch"
        id="paintable-switch"
        label="This item will be painted"
        checked={isPaintable}
        onChange={(e) => setIsPaintable(e.target.checked)}
      />

      <Button
        className="mt-3 me-2"
        variant="primary"
        type="button"
        onClick={sendCreateItemRequest}
      >
        Create
      </Button>

    </Form>
  );
};

export default Page;

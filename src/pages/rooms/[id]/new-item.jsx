import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';
import CalculateSqft  from '@/frontend/components/sqft-calc';

function Page() {
  const [itemName, setItemName] = useState('');
  const [itemWidth, setItemWidth] = useState('');
  const [itemHeight, setItemHeight] = useState('');
  const [roomId, setRoomId] = useState('');
  const [itemSqft, setItemSqft] = useState(0);
  const [room, setRoom] = useState({});

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
      itemName: itemName,
      itemWidth: itemWidth,
      itemHeight: itemHeight,
      itemSqft: CalculateSqft.addItemSqft(itemWidth, itemHeight),
      roomId: roomId
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
      itemName: itemName,
      itemWidth: itemWidth,
      itemHeight: itemHeight,
      itemSqft: CalculateSqft.subtractItemSqft(itemWidth, itemHeight),
      roomId: roomId
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
      <Form.Group controlId="item-name">
        <Form.Label>Item Name</Form.Label>

        <Form.Control
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="item-width">
        <Form.Label>Item Width</Form.Label>

        <Form.Control
          type="text"
          value={itemWidth}
          onChange={(e) => setItemWidth(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="item-height">
        <Form.Label>Item Height</Form.Label>

        <Form.Control
          type="text"
          value={itemHeight}
          onChange={(e) => setItemHeight(e.target.value)}
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

      <Button
        className="mt-3"
        variant="primary"
        type="button"
        href="/rooms"
      >
       Rooms
      </Button>
    </Form>
  );
};

export default Page;

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';

function Page() {
  const [itemName, setItemName] = useState('');
  const [itemWidth, setItemWidth] = useState('');
  const [itemHeight, setItemHeight] = useState('');
  const [roomId, setRoomId] = useState(null);
  const [itemSqft, setItemSqft] = useState(0);
  const [room, setRoom] = useState({});

  const router = useRouter();

  useEffect(() => {
    // Fetch room data when the component mounts or when roomId changes
    const fetchRoomData = async () => {
      const { roomId } = router.query;
      if (roomId) {
        try {
          const response = await fetch(`/api/rooms/${roomId}`);
          if (response.ok) {
            const roomData = await response.json();
            setRoom(roomData); // Set the entire room object
            setRoomId(roomData.id); // Set roomId separately if needed
          } else {
            console.error(response);
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchRoomData();
  }, [router.query]);

  const sendCreateItemRequest = async () => {

    const newItem = {
      itemName: itemName,
      itemWidth: itemWidth,
      itemHeight: itemHeight,
      itemSqft: itemSqft,
      roomId: roomId
    };

    const response = await fetch(`/api/roooms/${room.id}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem)
    });

    if (response.ok) {
      const createdItem = await response.json();
      console.log(`Created item: ${JSON.stringify(createdItem)}`);

      router.push('/items');
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

      <Button className="mt-3 me-2" variant="primary" type="button" onClick={sendCreateItemRequest}>
        Add Sqft
      </Button>

      <Button className="mt-3" variant="primary" type="button" onClick={sendCreateItemRequest}>
        Subtract Sqft
      </Button>
    </Form>
  );
};

export default Page;

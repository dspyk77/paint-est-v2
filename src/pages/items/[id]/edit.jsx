import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';

function Page() {
  const [itemName, setItemName] = useState('');
  const [itemWidth, setItemWidth] = useState('');
  const [itemHeight, setItemHeight] = useState('');
  const [roomId, setRoomId] = useState(roomId);
  const [itemSqft, setItemSqft] = useState(0);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchRoom = async () => {
      const response = await fetch(`/api/items/${id}`, {
        method: 'GET',
      });

      console.log(response);

      if (response.ok) {
        const itemData = await response.json();

        setItemName(itemData.itemName);
        setItemWidth(itemData.itemWidth);
        setItemHeight(itemData.itemHeight);
        setItemSqft(itemData.itemSqft);
        setRoomId(itemData.roomId);
      } else {
        console.error(response);
      }
    };

    fetchRoom();
  }, [id]);

  const sendUpdateItemRequest = async () => {
    const updatedItem = {
      itemName: itemName,
      itemWidth: itemWidth,
      itemHeight: itemHeight,
      itemSqft: itemSqft,
      roomId: roomId
    };

    const response = await fetch(`/api/items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedItem)
    });

    if (response.ok) {
      const createdItem = await response.json();
      console.log(`Updated user: ${JSON.stringify(createdItem)}`);

      router.push(`/items/${id}`);
    } else {
      console.error(response);
    }
  };

  return (
    <Form className="mt-3">
      <Form.Group controlId="room-name">
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

      <Button className="mt-3" variant="primary" type="button" onClick={sendUpdateItemRequest}>
        Submit
      </Button>
    </Form>
  );
};

export default Page;

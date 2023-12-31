import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';

function Page() {
  const [itemName, setItemName] = useState('');
  const [itemWidth, setItemWidth] = useState('');
  const [itemHeight, setItemHeight] = useState('');
  const [roomId, setRoomId] = useState(null);

  const router = useRouter();

  const sendCreateItemRequest = async () => {
    const newItem = {
      itemName: itemName,
      itemWidth: itemWidth,
      itemHeight: itemHeight,
      roomId: roomId
    };

    const response = await fetch('/api/items', {
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

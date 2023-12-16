import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';

function Page() {
  const [items, setItems] = useState([]);

  const router = useRouter();
  const { id } = router.query;

  // useEffect(() => {
  //   const fetchItems = async () => {
  //     const response = await fetch(`/api/rooms/${id}/items`, {
  //       method: 'GET'
  //     });

  //     if (response.ok) {
  //       const items = await response.json();
  //       console.log(`Items: ${JSON.stringify(items)}`);
  //       setItems(items);
  //     } else {
  //       console.error(response);
  //     }
  //   };

  //   fetchItems();
  // }, [id]);

  const handleAddItem = async () => {
    const newItem = {
      itemName: 'Sample Item',
      itemWidth: 10,
      itemHeight: 5,
      itemSqft: 50,
    };

    try {
      const response = await fetch(`/api/rooms/${roomId}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        // Item added successfully
        // You can fetch the updated list of items for the room if needed
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const handleDeleteItem = async (id) => {
    const confirmation = window.confirm('Are you sure you want to delete this?');

    if (confirmation) {
      const response = await fetch(`/api/items/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setItems((prevItems) =>
          prevItems.filter((item) => item.id !== id)
        );
      } else {
        console.error(response);
      }
    }
  };

  const rows = [];
  for (let item of items) {
    const key = `${item.roomId}`;

    const row = (
      <tr key={key}>
        <td>{item.id}</td>
        <td>{item.itemName}</td>
        <td>{item.itemWidth}</td>
        <td>{item.itemHeight}</td>
        <td>{item.itemSqft}</td>
        <td>
          <Link href={`/items/${item.id}`}>Show</Link>
          <span> | </span>
          <Link href={`/items/${item.id}/edit`}>Edit</Link>
          <span> | </span>
          <Link href="" onClick={() => handleDeleteItem(item.id)}>Delete</Link>
        </td>
      </tr>
    );

    rows.push(row);
  }

  return (
    <>
      <h1 className="my-4 text-2xl">Items</h1>

      <Button variant="primary" href="/items/new">Create</Button>

      <Table responsive="md" variant='dark' striped hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Item Name</th>
            <th>Item Width</th>
            <th>Item Height</th>
            <th>Item Sqft</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {rows}
        </tbody>
      </Table>
    </>
  );
}

export default Page;

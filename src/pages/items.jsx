import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import ItemMapper from '@/lib/mapper/item-mapper';
import Item from '@/lib/model/item';

function Page() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch('/api/items', {
        method: 'GET'
      });

      if (response.ok) {
        const data = await response.json();
        const items = ItemMapper.fromObjectCollection(data);
        console.log(`Items: ${JSON.stringify(items)}`);
        setItems(items);
      } else {
        console.error(response);
      }
    };

    fetchItems();
  }, []);

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
    const key = `${item.id}`;

    const row = (
      <tr key={key}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.width}</td>
        <td>{item.height}</td>
        <td>{item.getSqft()}</td>
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

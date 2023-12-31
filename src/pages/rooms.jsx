import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';

function Page() {
  const [rooms, setRooms] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await fetch('/api/rooms', {
        method: 'GET'
      });

      if (response.ok) {
        const rooms = await response.json();
        console.log(`Rooms: ${JSON.stringify(rooms)}`);
        setRooms(rooms);
      } else {
        console.error(response);
      }
    };

    fetchRooms();
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch('/api/items', {
        method: 'GET'
      });

      if (response.ok) {
        const items = await response.json();
        console.log(`Rooms: ${JSON.stringify(items)}`);
        setItems(items);
      } else {
        console.error(response);
      }
    };

    fetchItems();
  }, []);

  const handleDeleteRoom = async (id) => {
    const confirmation = window.confirm('Are you sure you want to delete this?');

    if (confirmation) {
      const response = await fetch(`/api/rooms/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setRooms((prevRooms) =>
          prevRooms.filter((room) => room.id !== id)
        );
      } else {
        console.error(response);
      }
    }
  };

  const rows = [];
  for (let room of rooms) {
    const key = `${room.id}`;

    const row = (
      <tr key={key}>
        <td>{room.id}</td>
        <td>{room.roomName}</td>
        <td>{room.roomSqft}</td>
        <td>
          <Link href={`/rooms/${room.id}`}>Show</Link>
          <span> | </span>
          <Link href={`/rooms/${room.id}/edit`}>Edit</Link>
          <span> | </span>
          <Link href="" onClick={() => handleDeleteRoom(room.id)}>Delete</Link>
          <span> | </span>
          <Link href={`/rooms/${room.id}/new-item`}>Add Item</Link>
        </td>
      </tr>
    );

    rows.push(row);
  }

  return (
    <>
      <h1 className="my-4 text-2xl">Rooms</h1>

      <Button variant="primary" href="/rooms/new">Create</Button>

      <Table responsive="md" variant='dark' striped hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Room Name</th>
            <th>Room Sqft</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {rows}
        </tbody>
      </Table>
    </>

  // <>
  //   <Button variant="primary" href="/rooms/new">Create</Button>

  //   <h1 className="my-4 text-2xl">Master</h1>

  //   <Table responsive="md" variant='dark' striped hover className="mt-3">
  //     <thead>
  //       <tr>
  //         <th>Item</th>
  //         <th>Width</th>
  //         <th>Height</th>
  //         <th>Sqft</th>
  //       </tr>
  //     </thead>

  //     <tbody>
  //       <tr>
  //         <td>{items.itemName}</td>
  //         <td>{items.itemWidth}</td>
  //         <td>{items.itemHeight}</td>
  //         <td>{items.itemSqft}</td>
  //       </tr>
  //     </tbody>
  //   </Table>

  // </>
  );
}

export default Page;

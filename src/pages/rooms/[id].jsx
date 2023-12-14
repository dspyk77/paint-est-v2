import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Table from 'react-bootstrap/Table';
import Link from 'next/link';
import Spacer from '@/frontend/components/spacer';

function Page() {
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
  }, [id]);

  const handleDelete = async () => {
    const confirmation = window.confirm('Are you sure you want to delete?');

    if (confirmation) {
      const response = await fetch(`/api/rooms/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        router.push('/rooms');
      } else {
        console.error(response);
      }
    }
  };

  if (room == null) return;

  return (
    <>
      <h1>Room</h1>

      <Link variant="dark" className="me-auto" href="/rooms">Back</Link>

      <Spacer />

      <div>
        <Link href={`/rooms/${id}/edit`}>Edit</Link>
        <span> | </span>
        <Link href="" onClick={() => handleDelete(room.id)}>Delete</Link>
      </div>

      <Table variant='dark' size="md" responsive striped hover className="show-table">
        <tbody>
          <tr>
            <th>Room Name</th>
            <td>{room.roomName}</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default Page;

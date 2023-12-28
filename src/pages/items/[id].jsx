import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Table from 'react-bootstrap/Table';
import Link from 'next/link';
import Spacer from '@/frontend/components/spacer';

function Page() {
  const [item, setItem] = useState({});

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchItem = async () => {
      const response = await fetch(`/api/items/${id}`, {
        method: 'GET',
      });

      console.log(response);

      if (response.ok) {
        // console.log(await response.text());
        const itemData = await response.json();

        setItem(itemData);
      } else {
        console.error(response);
      }
    };

    fetchItem();
  }, [id]);

  const handleDelete = async () => {
    const confirmation = window.confirm('Are you sure you want to delete?');

    if (confirmation) {
      const response = await fetch(`/api/items/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        router.push('/items');
      } else {
        console.error(response);
      }
    }
  };

  if (item == null) return;

  return (
    <>
      <h1>Item</h1>

      <Link variant="dark" className="me-auto" href="/rooms">Back</Link>

      <Spacer />

      <div>
        <Link href={`/item/${id}/edit`}>Edit</Link>
        <span> | </span>
        <Link href="" onClick={() => handleDelete(item.id)}>Delete</Link>
      </div>

      <Table variant='dark' size="md" responsive striped hover className="show-table">
        <tbody>
          <tr>
            <th>Item Name</th>
            <td>{item.itemName}</td>
          </tr>
          <tr>
            <th>Item Width</th>
            <td>{item.itemWidth}</td>
          </tr>
          <tr>
            <th>Item Height</th>
            <td>{item.itemHeight}</td>
          </tr>
          <tr>
            <th>Item Sqft</th>
            {/* <td>{item.itemSqft}</td> */}
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default Page;

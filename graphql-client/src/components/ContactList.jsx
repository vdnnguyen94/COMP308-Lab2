//ContactList.jsx
import React from 'react';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
// import Button from 'react-bootstrap/Button';
import Button from 'react-bootstrap/Button';

// Query to fetch contacts
const GET_CONTACTS = gql`
  query GetContacts {
    contacts {
      id
      contactId
      name
      email
      phone
      address
    }
  }
`;

function ContactList() {
    const { loading, error, data, refetch } = useQuery(GET_CONTACTS);

    if (loading) return <Spinner animation="border" />;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            <h2>Contact List</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Contact ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.contacts.map((contact) => (
                        <tr key={contact.id}>
                            <td>{contact.contactId}</td>
                            <td>{contact.name}</td>
                            <td>{contact.email}</td>
                            <td>{contact.phone}</td>
                            <td>{contact.address}</td>
                            <td>
                                <Link to={`/editcontact/${contact.id}`}>Edit</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button variant="secondary" onClick={() => refetch()}>Refetch</Button>
        </div>
    );
}
export default ContactList;
import React from "react";
import { useSelector } from 'react-redux'

export default function Home() {
    const users = useSelector((state)=> state.users);
    console.log(users);
  return (
    <div className="container">
        <h2>Crud App with JSON Server</h2>
        <button className="btn btn-success my-3">Create +</button>
        <table className="table">
<thead>
    <tr>

        <th>Name</th>
        <th>Action</th>
    </tr>
</thead>
<tbody>
    {users.map((user, index) => (
        <tr key={index}>
            <td>{user.name}</td>
            <td>
                <button className="btn btn-sm btn-primary">Edit</button>
                <button className="btn btn-sm btn-danger ms-2">Delete</button>
            </td>
        </tr>
    ))}
</tbody>
        </table>
    </div>
  );
}
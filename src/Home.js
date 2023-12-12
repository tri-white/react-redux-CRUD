import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
import { ReactDOM } from "react";
import { deleteUser } from "./UserReducer";
export default function Home() {
    
    const users = useSelector((state)=> state.users);
    const dispatch = useDispatch();
    const handleDelete = (name) => {
        dispatch(deleteUser({name:name}));
    }
  return (
    <div className="container">
        <h2>Crud App with JSON Server</h2>
        <Link to="/create" className="btn btn-success my-3">Create +</Link>
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
                <Link to={'/edit/' + user.name} className="btn btn-sm btn-primary">Edit</Link>
                <button onClick={()=> handleDelete(user.name)} className="btn btn-sm btn-danger ms-2">Delete</button>
            </td>
        </tr>
    ))}
</tbody>
        </table>
    </div>
  );
}
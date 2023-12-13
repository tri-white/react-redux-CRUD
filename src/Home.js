import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
import { ReactDOM } from "react";
export default function Home() {
    
  return (
    <div className="container">
        <h2>Crud App with JSON Server</h2>
        <table className="table">
<thead>
    <tr>

        <th>Name</th>
        <th>Action</th>
    </tr>
</thead>
<tbody>
  
</tbody>
        </table>
    </div>
  );
}
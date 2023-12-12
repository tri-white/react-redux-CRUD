import React, { useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {updateUser} from './UserReducer'
function Update(){
    const {name} = useParams();
    const users = useSelector((state)=> state.users);
    const existingUser = users.filter(f => f.name == name);
    // const {name, email} = existingUser[0]  23:40
    // const [name, setName] = useState(name)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUpdate = (event)=>{
        event.preventDefault();
        dispatch(updateUser({
            name: uname
        }))
        navigate('/');
    }
    const [uname, setName] = useState(name);
    return(
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
      <div className='w-50 border bg-secondary text-white p-5'>
          <h1> Update user</h1>
          <form onSubmit={handleUpdate}>
              <div>
                  <label htmlFor='name'>
                      Name:
                  </label>
                  <input type='text' name='name' className='form-control' 
                  placeholder='Введіть імя' value={uname} onChange={e => setName(e.target.value)}>
                  </input>
              </div>
              <button className='btn btn-info mt-2'>Update</button>
          </form>
      </div>
  </div>
    )
}

export default Update;
import React, {useState} from 'react'
import { addUser } from './UserReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function Create(){
    const [name, setName] = useState('');
    const users = useSelector((state)=> state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (event) =>{
        event.preventDefault();
        dispatch(addUser({name: name}));
        navigate('/');
    }

    return(
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
            <div className='w-50 border bg-secondary text-white p-5'>
<h1> Add new user</h1>
<form onSubmit={handleSubmit}>
    <div>
        <label htmlFor='name'>
            Name:
        </label>
        <input 
        type='text' name='name' className='form-control' 
        placeholder='Введіть імя' onChange={e => setName(e.target.value)}>
        </input>
    </div>
    <button className='btn btn-info mt-2'> Submit</button>
</form>
            </div>

        </div>
    )
}

export default Create;
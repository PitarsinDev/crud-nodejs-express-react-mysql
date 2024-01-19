import React, { useState, useEffect } from 'react';
import './App.css';

import Footer from './App/Footer';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editingUserId, setEditingUserId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/read')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleCreateUser = () => {
    fetch('http://localhost:3001/api/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    })
      .then(response => response.text())
      .then(data => {
        console.log(data);
        fetch('/api/read')
          .then(response => response.json())
          .then(data => setUsers(data))
          .catch(error => console.error('Error fetching data:', error));
      })
      .catch(error => console.error('Error creating user:', error));
  };

  const handleDeleteUser = id => {
    fetch(`http://localhost:3001/api/delete/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.text())
      .then(data => {
        console.log(data);
        fetch('/api/read')
          .then(response => response.json())
          .then(data => setUsers(data))
          .catch(error => console.error('Error fetching data:', error));
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  const handleEditUser = (id, name, email) => {
    setEditingUserId(id);
    setName(name);
    setEmail(email);
  };

  const handleUpdateUser = () => {
    fetch(`http://localhost:3001/api/update/${editingUserId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    })
      .then(response => response.text())
      .then(data => {
        console.log(data);
        fetch('/api/read')
          .then(response => response.json())
          .then(data => setUsers(data))
          .catch(error => console.error('Error fetching data:', error));
        setName('');
        setEmail('');
        setEditingUserId(null);
      })
      .catch(error => console.error('Error updating user:', error));
  };

  return (
    <div>

      <div className='flex justify-center'>
        <div className='p-10'>
          <h1 className='text-center text-blue-500 text-3xl'>CRUD <span className='text-yellow-500'>App</span> <span className='text-green-500'>with</span> <span className='text-indigo-500'>Node.js</span> <span className='text-rose-500'>Express</span> <span className='text-blue-700'>React</span> and <span className='text-oranege-500'>MySQL</span></h1>
        </div>
      </div>
      
      <div className='flex justify-center'>
        <div>
          <h2 className='text-blue-500'>Create or Edit User</h2>
          <div className='flex justify-center pt-5 gap-2'>
            <div className='flex gap-2 items-center'>
              <label className='text-orange-500'>Name :</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className='border border-green-500 rounded-full pl-2'/>
            </div>
            <div className='flex gap-2 items-center'>
              <label className='text-green-500'>Email :</label>
              <input type="text" value={email} onChange={e => setEmail(e.target.value)} className='border border-orange-500 rounded-full pl-2'/>
            </div>
            {editingUserId ? (
              <button onClick={handleUpdateUser} className='shadow-md bg-indigo-200 text-indigo-500 px-5 py-1 rounded-full'>Update User</button>
            ) : (
              <button onClick={handleCreateUser} className='shadow-md bg-yellow-200 text-yellow-500 px-5 py-1 rounded-full'>Create User</button>
            )}
          </div>
        </div>
      </div>
              <div className='flex justify-center pt-10'>
                <div>
                  <div className='flex justify-center'>
                    <div className='p-5'>
                      <h2 className='text-center text-blue-500 text-2xl'>User <span className='text-orange-500'>List</span></h2>
                      <div className='bg-orange-500 w-5 h-1 rounded-full'></div>
                    </div>
                  </div>
                  <ul>
                    {users.map(user => (
                      <li key={user.id} className='flex gap-2'>
                        <div>
                          <span className='text-blue-500'>{user.name}</span>   <span className='text-orange-500'>{user.email}</span>{' '}
                        </div>
                        <div className='flex gap-2'>
                          <button onClick={() => handleDeleteUser(user.id)} className='shadow-sm bg-rose-200 text-rose-500 px-5 rounded-full'>
                            Delete
                          </button>
                          <button onClick={() => handleEditUser(user.id, user.name, user.email)} className='shadow-sm text-blue-500 bg-blue-200 px-5 rounded-full'>
                            Edit
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
          
        <Footer />
    </div>
  );
}

export default App;
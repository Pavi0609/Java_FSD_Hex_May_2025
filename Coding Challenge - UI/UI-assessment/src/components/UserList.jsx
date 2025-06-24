import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


{/* 2. Get user details */}
{/* 3. Delete user  */}
{/* 4. Edit user details */}

const API_TOKEN = '54a9e7025af02e339a47b4b5538022802ba5fc1e6368946f3a1d13b18700a001'; 

function UserList() {

  const navigate = useNavigate(); 

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    gender: 'male',
    status: 'active'
  });

  useEffect(() => {
    fetchUsers();
  }, [])

  {/* 2. Get user details */}
  const fetchUsers = async () => {

    try {
      const response = await axios.get('https://gorest.co.in/public/v2/users');
      setUsers(response.data);
      setLoading(false);
      
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }

  };

  {/* 3. Delete user  */}
  const handleDelete = async (userId) => {

    if (!window.confirm('Are you sure you want to delete this user?')) 
        return;
    
    try {
        
      await axios.delete(`https://gorest.co.in/public/v2/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`
        }
      });

      // methods to remove the deleted user
      setUsers(users.filter(user => user.id !== userId));
      setMessage('User deleted successfully');

    } catch (error) {
      console.error('Error deleting user:', error);
      setMessage('Failed to delete user');
    }

  };

  {/* 4. Edit user details */}
  const startEditing = (user) => {

    setEditingId(user.id);
    setEditForm({
      name: user.name,
      email: user.email,
      gender: user.gender,
      status: user.status
    });

  };

  // handle the changes during editing the uder details
  const handleEditChange = (e) => {

    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));

  };

  const handleEditSubmit = async (userId) => {

    try {
      await axios.put(`https://gorest.co.in/public/v2/users/${userId}`,editForm, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      // method to add the edited details
      setUsers(users.map(user => 
        user.id === userId ? { ...user, ...editForm } : user
      ));
      
      setEditingId(null);
      setMessage('User updated successfully');

    } catch (error) {
      console.error('Error updating user:', error);
      setMessage('Failed to update user');
    }

  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  // used to show the loading message while data is being fetched
  if (loading) return (
    <div style={{ 
      textAlign: 'center', 
      padding: '40px',
      fontSize: '1.2rem'
    }} >
      Loading users...
    </div>
  );


  return (

    <div className="user-list-container">
          <div className="user-list-header">
              <h2>User Management</h2>
              <button
                  onClick={() => navigate('/add-user')} 
                  style={{
                      padding: '8px 16px',
                      background: 'green',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                  }} >
                  Go to AddUser Page 
              </button>
          </div>  
      
      {message && (
        <div className="message">
          {message}
        </div>
      )}
      
      <div className="users-grid">
        {users.map(user => (
          <div key={user.id} className="user-card">
            {editingId === user.id ? (
              <div className="edit-form">
                <h3>Edit User</h3>
                <div className="form-group">
                  <label>Name &nbsp;&nbsp; </label>
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleEditChange} />
                </div>
                
                <div className="form-group">
                  <label>Email &nbsp;&nbsp;&nbsp; </label>
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleEditChange} />
                </div>
                
                <div className="form-group">
                  <label>Gender &nbsp;</label>
                  <select
                    name="gender"
                    value={editForm.gender}
                    onChange={handleEditChange} >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Status &nbsp;&nbsp; </label>
                  <select
                    name="status"
                    value={editForm.status}
                    onChange={handleEditChange} >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                
                <br />
                <div className="button-group">
                  <button
                    style={{background: 'blue', color: 'white'}}
                    onClick={() => handleEditSubmit(user.id)}
                    className="save-button" >
                    Save 
                  </button> 
                  &nbsp;&nbsp;&nbsp;&nbsp;

                  <button
                    style={{background: 'grey', color: 'white'}}
                    onClick={cancelEditing}
                    className="cancel-button" >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="user-details">
                <h3>{user.name}</h3>
                <p><strong>Email &nbsp;&nbsp; : &nbsp; </strong> {user.email}</p>
                <p><strong>Gender : &nbsp; </strong> {user.gender}</p>
                <p className="user-status">
                  <strong>Status &nbsp;  : &nbsp; </strong> 
                  <span className={`status-${user.status}`}>
                    {user.status}
                  </span>
                </p>
                
                <div className="button-group">
                  <button
                    style={{background: 'yellow', color: 'black'}}
                    onClick={() => startEditing(user)}
                    className="edit-button" >
                    Edit
                  </button>

                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <button
                    style={{background: 'red', color: 'white'}}
                    onClick={() => handleDelete(user.id)}
                    className="delete-button" >
                    Delete
                  </button>
                  <h4>---------------------------------------------------------------------</h4>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )

}

export default UserList;
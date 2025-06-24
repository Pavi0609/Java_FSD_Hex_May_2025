import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddUser from './components/AddUser';
import UserList from './components/UserList';

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<AddUser />} />
        <Route path = "/userList" element = {<UserList />} />
        <Route path="/add-user" element={<AddUser />} />
      </Routes>
    </BrowserRouter>

  );

}

export default App;
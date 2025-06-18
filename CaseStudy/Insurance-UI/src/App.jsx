import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/SignUp'

import CustomerDashboard from './components/customer/CustomerDashboard'
import AdminDashboard from './components/admin/AdminDashboard'
import Policy from './components/policy/Policy'
import AddPolicy from './components/policy/AddPolicy'

import Proposal from './components/proposal/Proposal'
import Quote from './components/quote/Quote'
import Claim from './components/claim/Claim'
import Review from './components/review/Review'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Home />} ></Route>

        <Route path = "/login" element = {<Login />} ></Route>

        <Route path = "/signup" element = {<Signup />} ></Route>

        <Route path = "/customer" element = {<CustomerDashboard />} ></Route>
        <Route path = "/admin" element = {<AdminDashboard />} ></Route>
        <Route path = "/policies" element = {<Policy />} ></Route>
        <Route path = "/addPolicy" element = {<AddPolicy />} ></Route>

        <Route path = "/admin/proposals" element={<Proposal />} />
        <Route path = "/admin/quotes" element={<Quote />} />
        <Route path = "/admin/claims" element={<Claim />} />
        <Route path = "/admin/reviews" element={<Review />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App;
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Login'

import CustomerDashboard from './components/customer/CustomerDashboard'
import AdminDashboard from './components/admin/AdminDashboard'
import Policy from './components/policy/Policy'
import AddPolicy from './components/policy/AddPolicy'

import Proposal from './components/proposal/Proposal'
import Quote from './components/quote/Quote'
import Review from './components/review/Review'
import AddQuote from './components/quote/AddQuote'
import CustomerProfile from './components/customer/CustomerProfile'
import CustomerCreateProposal from './components/customer/CustomerCreateProposal'
import CustomerMyProposals from './components/customer/CustomerMyProposals'
import CustomerMyQuotes from './components/customer/CustomerMyQuotes'
import CustomerAddPayment from './components/customer/CustomerAddPayment'
import CustomerViewPayment from './components/customer/CustomerViewPayment'
import AdminProfile from './components/admin/AdminProfile'
import { AddPolicyAddOns } from './components/PolicyAddOns/AddPolicyAddOns'
import PolicyAddOns from './components/PolicyAddOns/PolicyAddOns'
import { CustomerAddClaim } from './components/customer/CustomerAddClaim'

import { Claim } from './components/claim/Claim'
import {Payment} from './components/payment/Payment'
import {SignUp} from './components/SignUp'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Home />} ></Route>
        <Route path = "/login" element = {<Login />} ></Route>
        <Route path = "/signup" element = {<SignUp />} ></Route>

        {/* ADMIN */}
        <Route path = "/admin" element = {<AdminDashboard />} ></Route>
        <Route path = "/policies" element = {<Policy />} ></Route>
        <Route path = "/addPolicy" element = {<AddPolicy />} ></Route>

        <Route path="/admin/policy-addons" element={<PolicyAddOns />} />
        <Route path = "/addPolicyAddOns" element = {<AddPolicyAddOns />} ></Route>

        <Route path = "/admin/proposals" element={<Proposal />} />
        <Route path = "/admin/quotes" element={<Quote />} />
        <Route path = "/admin/claims" element={<Claim />} />
        <Route path = "/admin/reviews" element={<Review />} />

        <Route path="/admin/policies" element={<Policy />} />

        <Route path = "/adminProfile" element={<AdminProfile />} />
        <Route path = "/admin/payments" element={<Payment />} />
        <Route path = "/addQuotes" element={<AddQuote />} />

        {/* CUSTOMER */}
        <Route path = "/customer" element = {<CustomerDashboard />} ></Route>
        <Route path = "/customerProfile" element={<CustomerProfile />} />
        <Route path = "/customerDashboard" element={<CustomerDashboard />} />
        <Route path = "/createProposal" element={<CustomerCreateProposal />} />
        <Route path = "/myProposals" element={<CustomerMyProposals />} />
        <Route path = "/myQuotes" element={<CustomerMyQuotes />} />
        <Route path = "/addPayment" element={<CustomerAddPayment />} />
        <Route path = "/myPayment" element={<CustomerViewPayment />} />
        <Route path = "/addClaim" element = {<CustomerAddClaim />}></Route>
          
      </Routes>
    </BrowserRouter>
  )

}

export default App;
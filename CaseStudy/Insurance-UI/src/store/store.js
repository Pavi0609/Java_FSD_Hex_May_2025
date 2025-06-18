// I vl configure store here
// src/store/store.js

import { configureStore } from "@reduxjs/toolkit"
import UserReducer from "./reducers/UserReducer";
import policyReducer from "./reducers/PolicyReducer";
import addPolicyReducer from "./reducers/AddPolicyReducer";

// Register all your reducers
const store = configureStore({
    reducer: {
        user: UserReducer,
        policy: policyReducer,
        addPolicy: addPolicyReducer
    }
})

export default store; 


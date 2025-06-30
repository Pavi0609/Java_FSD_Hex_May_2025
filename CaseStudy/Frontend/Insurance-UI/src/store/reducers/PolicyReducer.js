const initialState = {
  policies: [],
  loading: false,
  deleteLoading: false,  // New state for delete operation
  error: null,
  deleteError: null      // New state for delete errors
};

const policyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_POLICIES_REQUEST':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'FETCH_POLICIES_SUCCESS':
      return {
        ...state,
        loading: false,
        policies: action.payload,
        error: null
      };
    case 'FETCH_POLICIES_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    // Optional: Add these if you want separate tracking
    case 'DELETE_POLICY_REQUEST':
      return {
        ...state,
        deleteLoading: true,
        deleteError: null
      }; 
    case 'DELETE_POLICY_SUCCESS':
      return {
        ...state,
        deleteLoading: false
      };
    case 'DELETE_POLICY_FAILURE':
      return {
        ...state,
        deleteLoading: false,
        deleteError: action.payload
      };
      
    default:
      return state;
  }
}

export default policyReducer;
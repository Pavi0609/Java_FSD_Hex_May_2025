const initialState = {
  loading: false,
  success: false,
  error: null,
  policy: null
};

const addPolicyReducer = (state = initialState, action) => {
  
  switch (action.type) {
    case 'ADD_POLICY_REQUEST':
      return {
        ...state,
        loading: true,
        success: false,
        error: null
      };
      
    case 'ADD_POLICY_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
        policy: action.payload,
        error: null
      };
      
    case 'ADD_POLICY_FAILURE':
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload
      };
      
    case 'RESET_POLICY_STATE':
      return initialState;
      
    default:
      return state;
  }
};

export default addPolicyReducer;
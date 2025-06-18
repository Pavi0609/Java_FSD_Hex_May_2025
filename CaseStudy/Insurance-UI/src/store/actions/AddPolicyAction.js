import axios from 'axios';

export const addPolicy = (policyData, token) => async (dispatch) => {
  try {
    dispatch({ type: 'ADD_POLICY_REQUEST' });
    
    const payload = {
      ...policyData,
      premiumAmount: parseFloat(policyData.premiumAmount)
    };
    
    const response = await axios.post('http://localhost:8080/api/policy/add', payload, {
      headers: { 
        "Authorization": `Bearer ${token}`,
        "Content-Type": 'application/json'
      }
    });
    
    dispatch({
      type: 'ADD_POLICY_SUCCESS',
      payload: response.data
    });
    
    return response.data;
    
  } catch (error) {
    dispatch({
      type: 'ADD_POLICY_FAILURE',
      payload: error.response?.data?.message || 'Failed to add policy. Please try again.'
    });
    throw error;
  }
};
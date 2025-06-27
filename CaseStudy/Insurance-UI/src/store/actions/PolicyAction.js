import axios from "axios";

export const fetchPolicies = () => async (dispatch) => {  

  try {
    dispatch({ type: 'FETCH_POLICIES_REQUEST' });
    
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.get('http://localhost:8080/api/policy/get-all', {
      headers: { "Authorization": "Bearer " + token }
    });
    
    dispatch({
      type: 'FETCH_POLICIES_SUCCESS',
      payload: response.data
    });
    
  } catch (error) {
    dispatch({
      type: 'FETCH_POLICIES_FAILURE',
      payload: error.message
    });
  }
}


export const deletePolicy = (policyId) => async (dispatch) => {
  
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    await axios.delete(`http://localhost:8080/api/policy/delete/${policyId}`, {
      headers: { "Authorization": "Bearer " + token }
    });
    
    // Refresh policies after deletion
    dispatch(fetchPolicies());
    
  } catch (error) {
    console.error("Error deleting policy:", error);
    throw error;
  }
  
}
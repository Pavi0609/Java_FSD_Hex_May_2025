import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/actions/UserAction";

function Login() {
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let [msg, setMsg] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const processLogin = async () => {
        let encodedString = window.btoa(username + ':' + password);
        try {
            const response = await axios.get('http://localhost:8080/api/user/token', {
                headers: { "Authorization": "Basic " + encodedString }
            });
            if (!response.data.token) throw new Error("No token received");
            const token = response.data.token; 
            localStorage.setItem('token', token); 
            const details = await axios.get('http://localhost:8080/api/user/details', {
                headers: { "Authorization": "Bearer " + token }
            });
            let user = {
                'username': username,
                'role': details.data.user.role
            }
            setUserDetails(dispatch)(user);
            const role = details.data.user.role;
            switch (role) {
                case "CUSTOMER": navigate("/customer"); break;
                case "ADMIN": navigate("/admin"); break;
                default: setMsg("Login Disabled, Contact Admin at admin@example.com"); return;
            }
            setMsg("Login Success!!!");
        }
        catch (err) {
            console.error("Login error:", err); 
            setMsg("Invalid Credentials!");
        }
    }

    return (
        <div style={{ 
            backgroundColor: '#f8f9fa', 
            minHeight: '100vh',
            padding: '0' // Remove default padding
        }}>
            <div className="container-fluid" style={{ padding: '0' }}> {/* Full width container */}
                <div className="row justify-content-center" style={{ 
                    margin: '0',
                    padding: '4rem 0' // Add vertical padding instead
                }}>
                    <div className="col-md-6">
                        <div className="card" style={{ 
                            border: 'none', 
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                        }}>
                            <div className="card-header" style={{ 
                                backgroundColor: '#2c3e50', 
                                color: 'white',
                                borderTopLeftRadius: '8px',
                                borderTopRightRadius: '8px',
                                fontSize: '1.2rem',
                                textAlign: 'center'
                            }}>
                                LOGIN
                            </div>
                            <div className="card-body">
                                {msg && <div className="alert alert-info">{msg}</div>}

                                <div className="mb-3">
                                    <label style={{ color: '#2c3e50', fontWeight: '500' }}>Enter username:</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        style={{ borderColor: '#ddd', borderRadius: '6px' }}
                                        onChange={(e) => setUsername(e.target.value)} />
                                </div>

                                <div className="mb-3">
                                    <label style={{ color: '#2c3e50', fontWeight: '500' }}>Enter password:</label>
                                    <input 
                                        type="password" 
                                        className="form-control"
                                        style={{ borderColor: '#ddd', borderRadius: '6px' }}
                                        onChange={(e) => setPassword(e.target.value)} />
                                </div>

                                <div className="mb-3">
                                    <button 
                                        className="btn w-100"
                                        style={{ 
                                            backgroundColor: '#2c3e50',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '6px',
                                            padding: '10px',
                                            fontWeight: '500'
                                        }}
                                        onClick={processLogin}>
                                        LOGIN
                                    </button>
                                </div>
                            </div>

                            <div className="card-footer text-center" style={{ 
                                backgroundColor: 'transparent',
                                borderTop: '1px solid #eee'
                            }}>
                                Don't have an Account?{' '}
                                <button 
                                    className="btn btn-sm"
                                    style={{ 
                                        color: '#e74c3c', // Changed to red color
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        fontWeight: '500',
                                        padding: '0',
                                        textDecoration: 'underline'
                                    }}
                                    onClick={() => navigate('/signup')}>
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
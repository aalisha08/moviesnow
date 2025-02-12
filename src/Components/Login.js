
// import React, { useState, useContext } from 'react';
// import { AuthContext } from '../Components/AuthContext';
// import '../Assets/Login.css';

// function Login({ onClose, switchToSignup }) {
//   const [email, setEmail] = useState('');
//   const [epass, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const { login } = useContext(AuthContext);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const username = email.split('@')[0]; // Just a simple example
//     login(username);
//     onClose();
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email"
//           />
//         </div>
//         <div className="form-group">
//           <label>Password:</label>
//           <input
//             type={showPassword ? "text" : "epass"}
//             value={epass}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password"
//           />
//         </div>
//         <div className="form-options">
//           <div>
//             <input
//               type="checkbox"
//               checked={showPassword}
//               onChange={(e) => setShowPassword(e.target.checked)}
//             />
//             <label>Show Password</label>
//           </div>
//           <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
//         </div>
//         <button type="submit" className="login-button">LOGIN</button>
//         <div className="signup-link">
//           Don't have an account? <a href="#" onClick={switchToSignup}>Sign up</a>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Login;
// import React, { useState } from 'react';
// import axios from 'axios';
// import '../Assets/Login.css';

// function Login({ onClose, switchToSignup, onLoginSuccess }) {
//   const [email, setEmail] = useState('');
//   const [epass, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setLoading(true);
//   //   setError('');

//   //   try {
//   //     const response = await axios.post('http://localhost:9001/tuntun/login', { email, epass });

//   //     if (response.status === 200) {
//   //       const userData = { username: email };
//   //       onLoginSuccess(userData);
//   //       alert('Login successful!');
//   //       onClose();
//   //     } else {
//   //       setError('Login failed, please try again.');
//   //     }
//   //   } catch (error) {
//   //     console.error('Error logging in:', error);
//   //     if (error.response && error.response.data) {
//   //       setError(error.response.data);
//   //     } else {
//   //       setError('Login failed, please try again.');
//   //     }
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//         const response = await axios.post('http://localhost:9001/tuntun/login', { email, epass });

//         if (response.status === 200) {
//             const userData = response.data; // User data including ID
//             localStorage.setItem('userId', userData.id); // Store user ID in local storage or context
//             onLoginSuccess(userData);
//             alert('Login successful!');
//             onClose();
//         } else {
//             setError('Login failed, please try again.');
//         }
//     } catch (error) {
//         console.error('Error logging in:', error);
//         setError('Login failed, please try again.');
//     } finally {
//         setLoading(false);
//     }
// };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       {error && <div className="error-message">{error}</div>}
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Password:</label>
//           <input
//             type={showPassword ? "text" : "password"}
//             value={epass}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password"
//             required
//           />
//         </div>
//         <div className="form-options">
//           <div>
//             <input
//               type="checkbox"
//               checked={showPassword}
//               onChange={(e) => setShowPassword(e.target.checked)}
//             />
//             <label>Show Password</label>
//           </div>
//           <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
//         </div>
//         <button type="submit" className="login-button" disabled={loading}>
//           {loading ? 'Logging In...' : 'LOGIN'}
//         </button>
//         <div className="signup-link">
//           Don't have an account? <a href="#" onClick={switchToSignup}>Sign up</a>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Login;
import React, { useState } from 'react';
import axios from 'axios';
import '../Assets/Login.css';

function Login({ onClose, switchToSignup, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [epass, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:9001/tuntun/login', { email, epass });

      if (response.status === 200) {
        const userData = response.data; 
        localStorage.setItem('userId', userData.id); 
        onLoginSuccess(userData);
        alert('Login successful!');
        onClose();
      } else {
        setError('Login failed, please try again.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Login failed, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            value={epass}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>
        <div className="form-options">
          <div>
            <input
              type="checkbox"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
            />
            <label>Show Password</label>
          </div>
          <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
        </div>
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? 'Logging In...' : 'LOGIN'}
        </button>
        <div className="signup-link">
          Don't have an account? <a href="#" onClick={switchToSignup}>Sign up</a>
        </div>
      </form>
    </div>
  );
}

export default Login;

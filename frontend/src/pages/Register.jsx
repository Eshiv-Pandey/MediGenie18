import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import { FaUserPlus, FaGoogle, FaGithub, FaFacebook } from 'react-icons/fa';
import './Register.css';

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRegister = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      await register(formData);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialRegister = (provider) => {
    console.log(`Registering with ${provider}`);
    // Implement social registration logic here
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1 className="register-title">Create Your Account</h1>
        <p className="register-subtitle">Join us to get started</p>

        {error && <div className="error-message">{error}</div>}

        <div className="social-register-container">
          <button 
            className="social-register-btn google" 
            onClick={() => handleSocialRegister('Google')}
            aria-label="Register with Google"
          >
            <FaGoogle size={18} />
          </button>
          <button 
            className="social-register-btn github" 
            onClick={() => handleSocialRegister('GitHub')}
            aria-label="Register with GitHub"
          >
            <FaGithub size={18} />
          </button>
          <button 
            className="social-register-btn facebook" 
            onClick={() => handleSocialRegister('Facebook')}
            aria-label="Register with Facebook"
          >
            <FaFacebook size={18} />
          </button>
        </div>

        <div className="register-divider">or register with email</div>

        <div className="register-form-container">
          <AuthForm 
            isLogin={false} 
            onSubmit={handleRegister} 
            isLoading={isLoading}
            error={error}
          />
        </div>

        <div className="register-footer-links">
          <Link to="/login" className="register-link">
            <FaUserPlus /> Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
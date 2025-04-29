import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import styled from 'styled-components';
import { FaGoogle, FaGithub, FaFacebook } from 'react-icons/fa';
import { motion } from 'framer-motion';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #297e52 0%, #000000 100%);
  padding: 2rem;
`;

const LoginCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
  padding: 2.5rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  color: #666;
  margin-bottom: 2rem;
  font-size: 1rem;
`;

const SocialLoginContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1.5rem 0;
`;

const SocialButton = styled.button`
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: white;
  color: #555;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }

  &.google:hover {
    border-color: #DB4437;
    color: #DB4437;
  }

  &.github:hover {
    border-color: #333;
    color: #333;
  }

  &.facebook:hover {
    border-color: #4267B2;
    color: #4267B2;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  color: #999;

  &::before, &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #ddd;
  }

  &::before {
    margin-right: 1rem;
  }

  &::after {
    margin-left: 1rem;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const FooterLinks = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  width: 100%;
`;

const StyledLink = styled(Link)`
  color: #4facfe;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: #3a8ac9;
    text-decoration: underline;
  }
`;

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      await login(formData);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    // Implement social login logic here
  };

  return (
    <LoginContainer>
      <LoginCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Title>Welcome Back</Title>
        <Subtitle>Sign in to continue to your account</Subtitle>

        <SocialLoginContainer>
          <SocialButton 
            className="google" 
            onClick={() => handleSocialLogin('Google')}
            aria-label="Login with Google"
          >
            <FaGoogle size={18} />
          </SocialButton>
          <SocialButton 
            className="github" 
            onClick={() => handleSocialLogin('GitHub')}
            aria-label="Login with GitHub"
          >
            <FaGithub size={18} />
          </SocialButton>
          <SocialButton 
            className="facebook" 
            onClick={() => handleSocialLogin('Facebook')}
            aria-label="Login with Facebook"
          >
            <FaFacebook size={18} />
          </SocialButton>
        </SocialLoginContainer>

        <Divider>or sign in with email</Divider>

        <FormContainer>
          <AuthForm 
            isLogin={true} 
            onSubmit={handleLogin} 
            isLoading={isLoading}
            error={error}
          />
        </FormContainer>

        <FooterLinks>
          <StyledLink to="/forgot-password">Forgot password?</StyledLink>
          <StyledLink to="/register">Create an account</StyledLink>
        </FooterLinks>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
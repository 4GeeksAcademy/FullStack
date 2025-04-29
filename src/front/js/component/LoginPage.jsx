import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        const endpoint = isLogin ? '/api/login' : '/api/register';
        const body = isLogin ? { email, password } : { email, password, name };

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            if (isLogin) {
                localStorage.setItem('token', data.token);
                navigate('/'); // redirect after login
            } else {
                // After successful registration
                setEmail('');
                setPassword('');
                setName('');
                setIsLogin(true);
                setError('Registration successful! Please login.');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow p-4" style={{ maxWidth: '450px', width: '100%' }}>
                <div className="text-center mb-4">
                    <i className="bi bi-person-circle text-danger" style={{ fontSize: '3rem' }}></i>
                    <h2 className="mt-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                    <p className="text-muted">
                        {isLogin ? 'Sign in to continue' : 'Join us to get started'}
                    </p>
                </div>

                {error && (
                    <div className={`alert ${error.includes('successful') ? 'alert-success' : 'alert-danger'}`}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="mb-3">
                            <label className="form-label">Full Name</label>
                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className="bi bi-person"></i>
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    placeholder="Enter your name"
                                />
                            </div>
                        </div>
                    )}

                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-envelope"></i>
                            </span>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Enter your email"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="form-label">Password</label>
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-lock"></i>
                            </span>
                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Enter your password"
                                minLength="6"
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                            </button>
                        </div>
                        {!isLogin && (
                            <small className="text-muted">Password must be at least 6 characters</small>
                        )}
                    </div>

                    {isLogin && (
                        <div className="d-flex justify-content-end mb-3">
                            <Link to="/forgot-password" className="text-decoration-none small">
                                Forgot password?
                            </Link>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-danger w-100 py-2 mb-3"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                {isLogin ? 'Logging in...' : 'Registering...'}
                            </>
                        ) : (
                            isLogin ? 'Login' : 'Register'
                        )}
                    </button>

                    <div className="text-center">
                        <button
                            type="button"
                            className="btn btn-link text-decoration-none"
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setError('');
                            }}
                        >
                            {isLogin ? (
                                <>
                                    Don't have an account? <span className="text-danger">Register</span>
                                </>
                            ) : (
                                <>
                                    Already have an account? <span className="text-danger">Login</span>
                                </>
                            )}
                        </button>
                    </div>

                    {isLogin && (
                        <div className="text-center mt-3">
                            <p className="text-muted">Or continue with</p>
                            <div className="d-flex justify-content-center gap-3">
                                <button type="button" className="btn btn-outline-danger rounded-circle">
                                    <i className="bi bi-google"></i>
                                </button>
                                <button type="button" className="btn btn-outline-danger rounded-circle">
                                    <i className="bi bi-facebook"></i>
                                </button>
                                <button type="button" className="btn btn-outline-danger rounded-circle">
                                    <i className="bi bi-twitter"></i>
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default LoginPage;


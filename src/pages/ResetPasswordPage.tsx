import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// const API_BASE_URL = 'http://localhost:5000/api';
const API_BASE_URL = 'https://tour-backend-eight.vercel.app/api';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [debugInfo, setDebugInfo] = useState(null);
  
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Extract token from URL path (assuming /reset-password/:token)
    const urlToken = window.location.pathname.split('/').pop();
    setToken(urlToken);
  }, []);

  useEffect(() => {
    if (token) {
      verifyToken();
    }
  }, [token]);

  const verifyToken = async () => {
    if (!token) {
      setError('No reset token provided');
      setVerifying(false);
      return;
    }

    try {
      setVerifying(true);
      const response = await fetch(`${API_BASE_URL}/verify-token/${token}`);
      const data = await response.json();

      if (response.ok && data.success) {
        setTokenValid(true);
        setError('');
      } else {
        setTokenValid(false);
        setError(data.message || 'Invalid or expired reset link');
        setDebugInfo({
          status: response.status,
          message: data.message,
          token: token ? `${token.substring(0, 10)}...` : 'No token',
          timestamp: new Date().toLocaleString(),
        });
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
      setDebugInfo({
        type: 'Network Error',
        message: err.message,
        timestamp: new Date().toLocaleString(),
      });
      setTokenValid(false);
    } finally {
      setVerifying(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setDebugInfo(null);

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/reset/${token}`, { password });

      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError(response.data.message || 'Failed to reset password');
      }
    } catch (err) {
      let errorMessage = 'Failed to reset password. Please try again.';
      let debugDetails = null;

      if (err.response) {
        const status = err.response.status;
        const responseData = err.response.data;

        switch (status) {
          case 400:
            errorMessage = responseData.message || 'Invalid password or expired token';
            break;
          case 500:
            errorMessage = 'Server error. Please try again later.';
            break;
          default:
            errorMessage = responseData.message || `Server error (${status})`;
        }

        debugDetails = {
          status,
          message: responseData.message,
          token: token ? `${token.substring(0, 10)}...` : 'No token',
          timestamp: new Date().toLocaleString(),
        };
      } else if (err.request) {
        errorMessage = 'Network error. Please check your connection.';
        debugDetails = {
          type: 'Network Error',
          message: 'No response from server',
          timestamp: new Date().toLocaleString(),
        };
      }

      setError(errorMessage);
      setDebugInfo(debugDetails);
    } finally {
      setLoading(false);
    }
  };

  if (verifying) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Verifying Reset Link</h2>
          <p className="text-gray-600">Please wait...</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Password Reset Successful!</h2>
          <p className="text-gray-600 mb-4">Your password has been updated successfully.</p>
          <p className="text-sm text-blue-600">Redirecting to login page in 3 seconds...</p>
        </div>
      </div>
    );
  }

  if (!tokenValid) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Invalid Reset Link</h2>
          <p className="text-gray-600 mb-6">{error}</p>

          {debugInfo && (
            <div className="mb-6 p-4 border border-red-200 rounded-lg bg-red-50 text-left">
              <details>
                <summary className="text-xs text-red-600 cursor-pointer hover:text-red-800">
                  🔍 Technical Details
                </summary>
                <div className="mt-2 p-3 bg-red-100 rounded border text-xs text-red-800 font-mono">
                  <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
                </div>
              </details>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={() => navigate('/forgot-password')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Request New Reset Link
            </button>
            <button
              onClick={() => navigate('/login')}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#5C7AC0]  hover:bg-[#284078] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m-2-2V5a2 2 0 00-2-2H9a2 2 0 00-2 2v2m0 0V9a2 2 0 002 2h6a2 2 0 002-2V7m-6 4v6m-4-2h8" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
          <p className="text-gray-600 mt-2">Enter your new password below</p>
        </div>

        {error && (
          <div className="mb-6 p-4 border border-red-200 rounded-lg bg-red-50">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <h4 className="text-red-800 font-medium mb-1">Error</h4>
                <p className="text-red-700 text-sm">{error}</p>

                {debugInfo && (
                  <details className="mt-3">
                    <summary className="text-xs text-red-600 cursor-pointer hover:text-red-800">
                      🔍 Technical Details
                    </summary>
                    <div className="mt-2 p-3 bg-red-100 rounded border text-xs text-red-800 font-mono">
                      <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
                    </div>
                  </details>
                )}
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              disabled={loading}
              minLength={6}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              disabled={loading}
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !password || !confirmPassword}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Updating Password...
              </>
            ) : (
              'Update Password'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a 
            href="/login" 
            className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
          >
            ← Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;

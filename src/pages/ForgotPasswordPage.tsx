
import React, { useState } from 'react';
import { authAPI } from '../lib/api';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState('');
  const [debugInfo, setDebugInfo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setDebugInfo(null);

    try {
      const data = await authAPI.forgotPassword(email);

      if (data.success) {
        // Agar backend generic message bheje jisme email ka pata na chale
        if (
          data.message ===
          'If an account with that email exists, a password reset link has been sent.'
        ) {
          setError('Email not found in our records. Please check and try again.');
          setEmailSent(false);
        } else {
          setEmailSent(true);
        }
      } else {
        setError(data.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Forgot password error:', error);

      let errorMessage = 'Something went wrong, please try again.';
      let debugDetails = null;

      if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        const responseData = error.response.data;

        switch (status) {
          case 400:
            errorMessage = responseData.message || 'Invalid data provided.';
            break;
          case 404:
            errorMessage = 'This email is not registered. Please create an account first.';
            break;
          case 500:
            errorMessage = 'Server error. Please try again later.';
            break;
          default:
            errorMessage = responseData.message || `Server error (${status})`;
        }

        debugDetails = {
          status: status,
          message: responseData.message,
          url: error.config?.url,
          method: error.config?.method,
          timestamp: new Date().toLocaleString(),
        };
      } else if (error.request) {
        // Network error
        errorMessage =
          'Network error. Check your internet connection or server might be down.';
        debugDetails = {
          type: 'Network Error',
          message: 'No response from server',
          baseURL: error.config?.baseURL,
          timestamp: new Date().toLocaleString(),
        };
      } else {
        // Something else happened
        errorMessage = error.message || 'Unknown error occurred';
        debugDetails = {
          type: 'Unknown Error',
          message: error.message,
          timestamp: new Date().toLocaleString(),
        };
      }

      setError(errorMessage);
      setDebugInfo(debugDetails);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmailSent(false);
    setEmail('');
    setError('');
    setDebugInfo(null);
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h2>

          <p className="text-gray-600 mb-6">
            We've sent password reset instructions to <strong>{email}</strong>
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>📧 Email not received?</strong>
              <br />
              • Check your spam/junk folder
              <br />
              • Make sure you entered the correct email
              <br />
              • Link expires in 10 minutes
            </p>
          </div>

          <button
            onClick={resetForm}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Try Different Email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#5C7AC0]  hover:bg-[#284078] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 7a2 2 0 012 2m-2-2V5a2 2 0 00-2-2H9a2 2 0 00-2 2v2m0 0V9a2 2 0 002 2h6a2 2 0 002-2V7m-6 4v6m-4-2h8"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-gray-900">Forgot Password?</h1>
          <p className="text-gray-600 mt-2">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 border border-red-200 rounded-lg bg-red-50">
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="flex-1">
                <h4 className="text-red-800 font-medium mb-1">Error</h4>
                <p className="text-red-700 text-sm">{error}</p>

                {/* Debug Information */}
                {debugInfo && (
                  <details className="mt-3">
                    <summary className="text-xs text-red-600 cursor-pointer hover:text-red-800">
                      🔍 Technical Details (for developers)
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
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !email}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending Reset Link...
              </>
            ) : (
              'Send Reset Link'
            )}
          </button>
        </form>

        {/* Help Section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Common Issues & Solutions</h3>
            <div className="text-xs text-gray-600 space-y-2">
              <div className="flex items-start text-left">
                <span className="text-red-500 mr-2">•</span>
                <span>
                  <strong>"Email not registered":</strong> Create an account first
                </span>
              </div>
              <div className="flex items-start text-left">
                <span className="text-yellow-500 mr-2">•</span>
                <span>
                  <strong>"Network error":</strong> Check internet connection
                </span>
              </div>
              <div className="flex items-start text-left">
                <span className="text-blue-500 mr-2">•</span>
                <span>
                  <strong>"Server error":</strong> Try again in a few minutes
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Login */}
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

export default ForgotPasswordPage;

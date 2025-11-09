# Security Guidelines

## Overview
This document outlines the security measures implemented in the Exam Genius frontend application.

## Security Measures Implemented

### 1. Input Validation & Sanitization
- **Email Validation**: Secure regex patterns to prevent ReDoS attacks
- **Password Validation**: Minimum length requirements and type checking
- **Token Validation**: Format validation for JWT tokens and session IDs
- **Endpoint Validation**: Whitelist approach for API endpoints

### 2. XSS Prevention
- Input sanitization for user data
- Token format validation before localStorage storage
- Error message sanitization
- Proper HTML escaping in React components

### 3. CSRF Protection
- `X-Requested-With` header added to all API requests
- Same-origin credential policy
- Token-based authentication

### 4. SSRF Prevention
- Endpoint whitelist validation
- Restricted API path access
- URL format validation

### 5. Credential Security
- Environment variable usage for test credentials
- No hardcoded passwords in source code
- Secure token storage and validation

### 6. Error Handling
- Comprehensive try-catch blocks
- Secure error message display
- Proper logging without sensitive data exposure

## Environment Variables

Create a `.env` file with the following variables:

```env
# API Configuration
VITE_API_URL=https://cadna-backend.onrender.com

# Test Credentials (Development Only)
VITE_TEST_STUDENT_EMAIL=your_test_email@example.com
VITE_TEST_STUDENT_PASSWORD=your_secure_password

# Security Configuration
VITE_ENABLE_2FA=true
VITE_SESSION_TIMEOUT=3600000
```

## Security Best Practices

1. **Never commit `.env` files** - Use `.env.example` as template
2. **Regular dependency updates** - Keep packages up to date
3. **Input validation** - Always validate user inputs
4. **Secure communication** - Use HTTPS in production
5. **Token management** - Implement proper token expiration and refresh

## Reporting Security Issues

If you discover a security vulnerability, please report it to the development team immediately.
// Base API URL - points to the Express backend
const API_URL = 'http://localhost:3000/api';

// Get stored JWT token
function getToken() {
    return localStorage.getItem('token');
}

// Build authorization headers for API requests
function authHeaders() {
    const token = getToken();
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
}

// Check if user is logged in (redirect to login if not)
function checkAuth() {
    const token = getToken();
    if (!token) {
        window.location.href = 'login.html';
    }
}

// Get current user from localStorage
function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// Logout function - clear token and user data
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// Handle API errors (auto-logout on 401 Unauthorized)
function handleApiError(response) {
    if (response.status === 401) {
        logout();
        return null;
    }
    return response;
}

// HTML escape function to prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

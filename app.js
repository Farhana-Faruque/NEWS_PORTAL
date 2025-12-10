// Base API URL
const API_URL = 'http://localhost:3000';

// Check if user is logged in
function checkAuth() {
    const user = localStorage.getItem('currentUser');
    if (!user) {
        window.location.href = 'login.html';
    }
}

// Get current user
function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
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

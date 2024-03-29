// Add event listeners to buttons
document.getElementById('registerBtn').addEventListener('click', register);
document.getElementById('loginBtn').addEventListener('click', login);
document.getElementById('testRouteBtn').addEventListener('click', testProtectedRoute);
document.getElementById('logoutBtn').addEventListener('click', logout);

async function register() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (!username || !password) {
    alert('Please enter both username and password.');
    return;
  }

  try {
    const response = await fetch('/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      alert('Registration successful!');
    } else {
      alert('Registration failed!');
    }
  } catch (error) {
    console.error('Error during registration:', error);
  }
}

async function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      alert('Login successful!');
    } else {
      alert('Login failed!');
    }
  } catch (error) {
    console.error('Error during login:', error);
  }
}

async function testProtectedRoute() {
// Retrieve JWT token from local storage
const token = localStorage.getItem('token');

if (!token) {
    console.error('JWT token not found in local storage');
}

try {
    const response = await fetch('/api/hello', {
        method: 'GET',
        headers: {
            'Authorization': token,
        }
    });

    if (response.ok) {
        // Handle successful response from the protected route
        const data = await response.json();
        console.log('Response from protected route:', data);
    } else {
        // Handle error response from the protected route
        console.error('Error accessing protected route:', response.status);
    }
} catch (error) {
    console.error('Error:', error);
    }
}



function logout() {
  localStorage.removeItem('token');
  alert('Logged out successfully!');
}
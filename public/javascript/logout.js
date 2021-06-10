// add click event handler that calls /logout route
async function logout() {
    const response = await fetch('/api/users/logout', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' }
    });
    // if logout is successful, redirect to homepage
    if (response.ok) {
      document.location.replace('/');
    } else {
        // logout unsuccessful, send alert
      alert(response.statusText);
    }
  }
  
  document.querySelector('#logout').addEventListener('click', logout);
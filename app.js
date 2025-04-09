// const Filein = document.getElementById('fileinput');


// document.getElementById('SendBtn').addEventListener('click', sendFuntion);

// function sendFuntion() {

// }


const clientId = 'YOUR_CLIENT_ID';
const scope = 'https://www.googleapis.com/auth/drive.file';

// Authenticate and get an access token
const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&response_type=token&redirect_uri=http://localhost:8080&scope=${scope}`;
window.location.href = authUrl;

// Handle redirect and get access token
const accessToken = new URLSearchParams(window.location.hash).get('access_token');

// Upload file to Google Drive
fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=media', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/octet-stream'
  },
  body: 'Hello, World!'
})
.then((response) => response.json())
.then((data) => console.log(data))
.catch((error) => console.error(error));
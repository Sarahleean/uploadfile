// const clientId = '61269711822-fpeg53gbnsg3idln6ihbahdoadcpjla4';
// // 61269711822-fpeg53gbnsg3idln6ihbahdoadcpjla4.apps.googleusercontent.com
// const scope = 'https://www.googleapis.com/auth/drive.file';

// // Authenticate and get an access token
// const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&response_type=token&redirect_uri=//https://sarahleean.github.io&scope=${scope}`;
// window.location.href = authUrl;

// // Handle redirect and get access token
// const accessToken = new URLSearchParams(window.location.hash).get('access_token');  

// // Upload file to Google Drive
// fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=media', {
//   method: 'POST',
//   headers: {
//     'Authorization': `Bearer ${accessToken}`,
//     'Content-Type': 'application/octet-stream'
//   },
//   body: 'Hello, World!'
// })
// .then((response) => response.json())
// .then((data) => console.log(data))
// .catch((error) => console.error(error));



const clientId = '61269711822-fpeg53gbnsg3idln6ihbahdoadcpjla4';
const scope = 'https://www.googleapis.com/auth/drive.file';
const folderId = '19rd3VvIRhCsADDQW_8rVlM8635_3gqDG'; // Replace with your folder ID

// Authenticate and get an access token
const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&response_type=token&redirect_uri=https://sarahleean.github.io&scope=${scope}`;
window.location.href = authUrl;

// Handle redirect and get access token
const accessToken = new URLSearchParams(window.location.hash).get('access_token');

// Upload file to Google Drive
document.getElementById('uploadButton').addEventListener('click', () => {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  const fileName = file.name;
  const fileData = new FormData();
  fileData.append('file', file);

  fetch(`https://www.googleapis.com/upload/drive/v3/files?uploadType=media&fields=id,name`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/octet-stream'
    },
    body: file
  })
    .then((response) => response.json())
    .then((data) => {
      const fileId = data.id;
      // Move file to specific folder
      fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?addParents=${folderId}&removeParents=root`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    })
    .catch((error) => console.error(error));
});

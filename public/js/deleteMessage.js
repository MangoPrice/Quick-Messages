function deleteMessage(index) {
    console.log('Deleting message at index:', index);
  
    fetch(`/delete/${index}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        console.log('Message deleted!');
        location.reload();
      } else {
        console.error('Error deleting message:', data.message);
        alert('Error deleting message: ' + data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while deleting the message.');
    });
  }
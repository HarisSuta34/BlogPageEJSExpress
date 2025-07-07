document.querySelectorAll('.edit-btn').forEach((btn) => {
  btn.addEventListener('click', function () {
    const id = this.getAttribute('data-id');
    const newText = prompt('Enter updated text:');
    if (newText && newText.trim() !== "") {
      fetch(`/posts/${id}/edit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `newContent=${encodeURIComponent(newText.trim())}`,
      }).then(() => {
        window.location.reload();
      });
    }
  });
});
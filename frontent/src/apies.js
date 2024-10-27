fetch("https://a3fc-195-158-9-110.ngrok-free.app/api/v1/article/user/art/", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "ngrok-skip-browser-warning": "69420",
    },
})
    .then(response => response.json())
    .then(data => console.log(data['results']))
    .catch(error => console.error("Error:", error));


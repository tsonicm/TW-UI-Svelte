export default function getFiles() {
    fetch("https://localhost:7147/api/file").then(response => {
        return response.json();
    });
}
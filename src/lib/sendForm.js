export default async function sendForm(form) {
    let response = await fetch('https://localhost:7147/api/file', {
        method: 'POST',
        body: formData
    })
    let result = await response.json();
    return result;
}
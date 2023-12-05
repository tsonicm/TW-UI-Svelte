export default async function sendForm(form) {
    try {
        const response = await fetch('https://localhost:7147/api/file', {
            method: 'POST',
            body: form
        });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
        return error;
    };
}
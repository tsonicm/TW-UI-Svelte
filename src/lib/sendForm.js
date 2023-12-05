export default async function sendForm(form) {
    let formData = new FormData(form);
    let response = await fetch(form.action, {
        method: form.method,
        body: formData
    });
    let result = await response.json();
    return result;
}
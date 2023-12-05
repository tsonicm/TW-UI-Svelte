export default async function sendForm(form) {
    let response = await fetch(form.action, {
        method: 'POST',
        body: form
    });
    let result = await response.json();
    return result;
}
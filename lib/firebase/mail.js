import { headers } from 'next/headers';

export const sendMail = async () => {
    const headersInstance = headers()
    const url = process.env.NEXT_FIREBASE_API;
    const options = {
        method: "POST",
        body: {
            "email": "sahil3112109695@gmail.com",
            "subject": "Hey from nextjs",
            "message": "hello"
        },
    };
    const res = await fetch(`${url}/api/mail`, options);
    const data = await res.json();
    return data
}
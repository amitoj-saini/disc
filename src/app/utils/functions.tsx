import { FormEvent } from "react";

export function formDataRequest(url: string, onstart: () => void, callback: (json: any) => void, method="POST") {
    return async function onSubmit(event: FormEvent<HTMLFormElement>) {
        onstart();
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        let jsonData = {} as {[key: string]: any}
        formData.forEach((value, key) => {jsonData[key] = value});
        console.log(jsonData)
        const response = await fetch(url, {
            method: method,
            body: JSON.stringify(jsonData),
            headers: {"Content-Type": "application/json"}
        });
    
        callback(await response.json());
    }
}
interface Fields {
    name: string;
    length: number;
}

export default async function validateRequestBody(req: Request, requiredFields: Fields[]) {
    let data = await req.json();

    for (let i=0; i<requiredFields.length; i++) {
        if (requiredFields[i].name in data) {
            if (data[requiredFields[i].name].length < requiredFields[i].length) continue;
            else return [data, `The ${requiredFields[i].name} was longer than ${requiredFields[i].length} characters`];
        } else {
            return [data, "Form was invalid"];
        }
    }

    return [data, null];
}
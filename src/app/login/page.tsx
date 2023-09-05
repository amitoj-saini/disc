import { authValidator } from "../components/authValidator";
import LoggedOutForm, { Input } from "../components/LoggedOutForm";
import { redirect } from "next/navigation";


export default async function SignUp() {
    let redirectUrl = await authValidator(false);
    if (typeof redirectUrl == "string") redirect(redirectUrl);
    return (
        <LoggedOutForm formaction="/api/login" buttonName="Login">
            <Input type="text" name="username" label="Username" placeholder="Enter Username"/>
            <Input type="password" name="password" label="Password" placeholder="Enter Password"/>
        </LoggedOutForm>
    )
}
import type { InferGetServerSidePropsType, GetServerSideProps } from "next"

interface User {
    id: number,
    name: string,
    username: string,
}

interface AuthValidatorProps {
    requiredLoginStatus: "loggedin" | "notloggedin"
    user?: User,
    children: React.ReactNode
}

export default function AuthValidator({ requiredLoginStatus, user, children } : AuthValidatorProps) {
    
    return <>{children}</>
}

export const getServerSideProps: GetServerSideProps<{user?: User}> = async () => {
    const res = await fetch("/api/user");
    const user = await res.json();
    return { props: { user } };
  }
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth";
import { redirect } from "next/navigation";


export async function getCurrentUser(){
    const session = await getServerSession(authOptions);
    return session?.user;
}

export async function requireAuth(){
    const user = await getCurrentUser()
    if(!user){
        redirect('/login');
    }
    return user
}

export async function requireRole(allowedRoles: string[]){
    const user = await requireAuth();
    if(!allowedRoles.includes(user.role)){
        redirect('/unauthorized');
    }
    return user;
}

import type { User } from "@prisma/client";
import type { RequestEvent } from "@sveltejs/kit";
import { prisma } from "./db";
import { PUBLIC_SESSION_ID } from "$env/static/public";

export async function login(user: User, ev: RequestEvent, exp: Date){
    await prisma.login.deleteMany({where:{userId: user.id}})
    let login = await prisma.login.create({data: {userId: user.id, exp}})
    ev.cookies.set(PUBLIC_SESSION_ID, login.id, {path: "/", expires: exp})
}
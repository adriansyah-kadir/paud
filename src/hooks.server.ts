import { PUBLIC_SESSION_ID } from "$env/static/public";
import { prisma } from "$lib/db";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({event, resolve}) => {
    await prisma.login.deleteMany({
        where: {
            exp: {
                lt: new Date()
            }
        }
    })
    let session = event.cookies.get(PUBLIC_SESSION_ID)
    if(session){
        event.locals.user = await prisma.user.findFirst({where: {login: {id: session}}})
        if(event.locals.user === null) event.cookies.delete(PUBLIC_SESSION_ID)
    }
    return resolve(event)
}
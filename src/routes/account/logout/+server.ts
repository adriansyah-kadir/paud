import { redirect } from "@sveltejs/kit";
import type { RequestEvent } from "./$types";
import { PUBLIC_SESSION_ID } from "$env/static/public";

export function GET(ev: RequestEvent) {
    ev.cookies.delete(PUBLIC_SESSION_ID, {path: "/"})
    throw redirect(302, "/")
}
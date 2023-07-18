import type { ServerLoad } from "@sveltejs/kit";

export const load: ServerLoad = async (ev) => {
    return {
        loggedin: !!ev.locals.user
    }
}
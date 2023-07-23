import { redirect, type Actions } from "@sveltejs/kit";
import {createValidator} from "./helper"
import { prisma } from "$lib/db";
import { login } from "$lib/account";

export const actions: Actions = {
    default: async (ev) => {
        let form = await ev.request.formData()
        let data = createValidator()
        let success = false;
        let message = "failed"
        if(data.check(form)){
            let values = data.getValues()
            let user = await prisma.user.findFirst({where: {
                username: values.username,
                password: values.password,
            }})
            if(user) {
                await login(user, ev, new Date(Date.now() + 1000 * 60 * 60 * 24))
                throw redirect(302, '/')
            }else message = "user not found"
        }
        return {
            values: data.values,
            errors: data.errors,
            success,
            message,
        }
    }
}
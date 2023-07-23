import { prisma } from "$lib/db";
import type { Actions } from "@sveltejs/kit";
import {data} from "./helper"

export const actions: Actions = {
    default: async (ev) => {
        let success = false;
        let message = "failed"
        let form = await ev.request.formData();
        if(data.check(form)){
            if(await prisma.user.findFirst({where: {username: data.values.username as string}})){
                message = "username already used"
            }else{
                let _ = await prisma.user.create({data: {
                    username: data.values.username as string,
                    password: data.values.password as string,
                    birthdate: new Date(data.values.birthdate as string),
                    gender: data.values.gender as any,
                    nuptk: data.values.nuptk as string,
                    nip: data.values.nip as string|null,
                }})
                success = true
                message = "Sukses!!"
            }
        }
        return {
            success,
            message,
            values: data.values,
            errors: data.errors
        }
    }
}
import { fail, type Actions, redirect } from "@sveltejs/kit";
import { Validator, MinMaxInputLen, NotEmptyString } from "$lib/form_validations"
import { prisma } from "$lib/db";
import { login } from "$lib/account";

export const actions: Actions = {
    default: async (ev) => {
        let form = await ev.request.formData()
        let data = {
            username: form.get("username")?.toString(),
            password: form.get("password")?.toString(),
            savelogin: form.get("savelogin")?.toString(),
        }
        const gagal = (message: string) => fail(302, { data, message })
        if(!data.username || !data.password) return gagal("username and password required");
        else{
            const is_valid = Validator<string>(MinMaxInputLen(5, 20), NotEmptyString(true))
            if(!is_valid.all(data.username, data.password)) return gagal("invalid input");
            let user = await prisma.user.findFirst({where: {username: data.username, password: data.password}})
            if(!user) return gagal("username atau password salah");
            await login(user, ev, new Date(Date.now() + 1000 * 60 * 60 * (data.savelogin === "on" ? 24 : 2)))
            throw redirect(302, "/")
        }
    }
}
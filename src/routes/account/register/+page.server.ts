import { prisma } from "$lib/db";
import { MinMaxInputLen, NotEmptyString, Validator } from "$lib/form_validations";
import { fail, type Actions } from "@sveltejs/kit";

function notUndefinedOrNull<T>(...inputs: T[]){
    return inputs.reduce((prev, curr)=> curr !== null || curr !== undefined, true)
}

function objPropsToArray<T>(obj: {[key: string]: T}): T[]{
    let prev: T[] = [];
    return Object.keys(obj).reduce((prev, curr) => [obj[curr], ...prev], prev)
}

export const actions: Actions = {
    default: async (ev) => {
        let is_valid = Validator(MinMaxInputLen(5, 20), NotEmptyString(true))
        let form = await ev.request.formData()
        let data = {
            username: form.get("username")?.toString(),
            password: form.get("password")?.toString(),
            birthdate: form.get("birthdate")?.toString(),
            nip: form.get("nip")?.toString(),
            nuptk: form.get("nuptk")?.toString(),
        }
        const gagal = (message: string) => fail(302, {data, message})
        if(!notUndefinedOrNull(...objPropsToArray(data))) return gagal("fill all required input");
        else{
            if(!is_valid.all(...objPropsToArray(data) as string[])) return gagal("invalid input");
            
        }
        return {
            message: "Sukses!!"
        }
    }
}
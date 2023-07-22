<script lang="ts">
    import Toast from "$lib/components/Toast.svelte";
    import DateInput from "$lib/components/form/DateInput.svelte";
    import RadioInput from "$lib/components/form/RadioInput.svelte";
    import TextInput from "$lib/components/form/TextInput.svelte";
    import type { ActionData } from "./$types";
    import { data as validator } from "./helper";

    export let form: ActionData;

    let inputclass =
        "transition-all border bg-white ring-0 hover:ring ring-blue-300 p-2";
</script>

<div>
    {#if form}
        <Toast label="Notif" message={form.message} />
    {/if}
    <form
        class="w-full max-w-sm p-5 rounded-lg m-auto my-10"
        method="post"
        enctype="multipart/form-data"
    >
        <div class="my-3">
            <h2 class="h2">Daftar Akun</h2>
        </div>
        <div class="flex flex-col gap-2">
            <TextInput
                name="username"
                placeholder="username"
                class={inputclass}
                value={form?.values?.username?.toString()}
                error={form?.errors.username}
                validators={validator.opts.username.validators}
                required={validator.opts.username.required}
            />
            <TextInput
                name="password"
                type='password'
                placeholder="password"
                class={inputclass}
                value={form?.values?.password?.toString()}
                error={form?.errors.password}
                validators={validator.opts.password.validators}
                required={validator.opts.password.required}
            />
            <DateInput
                name="birthdate"
                type="float"
                placeholder="tggl lahir"
                class={inputclass}
                value={form?.values?.birthdate?.toString()}
                error={form?.errors.birthdate}
                validators={validator.opts.birthdate.validators}
                required={validator.opts.birthdate.required}
            />
            <TextInput
                name="nip"
                placeholder="NIP"
                class={inputclass}
                value={form?.values?.nip?.toString()}
                error={form?.errors.nip}
                validators={validator.opts.nip.validators}
                required={validator.opts.nip.required}
            />
            <TextInput
                name="nuptk"
                placeholder="NUPTK"
                class={inputclass}
                value={form?.values?.nuptk?.toString()}
                error={form?.errors.nuptk}
                validators={validator.opts.nuptk.validators}
                required={validator.opts.nuptk.required}
            />
            <RadioInput
                label="Jenis Kelamin"
                name="gender"
                radios={[
                    { label: "P", value: "Female" },
                    { label: "L", value: "Male" },
                ]}
                error={form?.errors.gender}
            />
        </div>
        <div class="flex items-center my-3">
            <button class="btn btn-primary">Daftar</button>
        </div>
    </form>
</div>

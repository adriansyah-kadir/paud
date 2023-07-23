<script lang="ts">
    import Toast from "$lib/components/Toast.svelte";
import TextInput from "$lib/components/form/TextInput.svelte";
    import type { ActionData } from "./$types";
    import { createValidator } from "./helper";

    export let form: ActionData;

    let validator = createValidator();
    let inputclass =
        "transition-all border bg-white ring-0 hover:ring ring-blue-300 p-2";
</script>

{#if form}
    <Toast label="Notif" message={form.message}/>
{/if}

<div class="h-full w-full flex flex-col items-center justify-center p-3">
    <form
        class="mt-10 w-full flex flex-col gap-3"
        style="max-width: 300px;"
        method="post"
    >
        <img src="/logo-paud-berwarna.png" class="h-14 w-14" alt="" />
        <div class="text-xl">Login PAUD</div>
        <TextInput
            class={inputclass}
            name="username"
            placeholder="username"
            required={validator.opts.username.required}
            validators={validator.opts.username.validators}
            value={form?.values.username?.toString()}
            error={form?.errors.username}
        />
        <TextInput
            value={form?.values.password?.toString()}
            class={inputclass}
            error={form?.errors.username}
            name="password"
            type="password"
            placeholder="password"
            required={validator.opts.password.required}
            validators={validator.opts.password.validators}
        />
        <button class="btn btn-primary btn-lg">login</button>
    </form>
    <p class="p-3">
        tidak punya akun? <a
            class="text-blue-600 hover:underline"
            href="/account/register">register</a
        >
    </p>
</div>

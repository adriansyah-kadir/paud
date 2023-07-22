<script lang="ts">
    import Toast from "$lib/components/Toast.svelte";
    import TextInput from "$lib/components/form/TextInput.svelte";
    import type { ActionData } from "./$types";

    export let form: ActionData;

    let inputclass =
        "transition-all border bg-white ring-0 hover:ring ring-blue-300 p-2";
</script>

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
            type="float"
            placeholder="username"
        />
        <TextInput
            class={inputclass}
            name="password"
            type="float"
            placeholder="password"
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

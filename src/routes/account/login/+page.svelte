<script lang="ts">
    import Toast from "$lib/components/Toast.svelte";
    import type { ActionData } from "./$types";

    export let form: ActionData;

</script>

<div class="h-full w-full flex flex-col items-center justify-center p-3">
    {#if form}
        <Toast label="notif" message={form.message} />
    {/if}
    <form
        class="mt-10 w-full flex flex-col gap-3"
        style="max-width: 300px;"
        method="post"
    >
        <img src="/logo-paud-berwarna.png" class="h-14 w-14" alt="" />
        <div class="text-xl">Login PAUD</div>
        <div class="divide-y border rounded-md">
            <div class="form-floating [&:has(input:focus)]:z-10">
                <input
                    type="text"
                    class="rounded-t-md rounded-b-none border-none form-control"
                    id="username"
                    required
                    placeholder="username"
                    name="username"
                    value={form?.data?.username ? form.data.username : ""}
                    minlength="5"
                />
                <label for="username">username</label>
            </div>
            <div class="form-floating">
                <input
                    type="text"
                    class="form-control rounded-t-none rounded-b-md border-none"
                    id="password"
                    placeholder="password"
                    required
                    name="password"
                    value={form?.data?.password ? form.data.password : ""}
                    minlength="5"
                />
                <label for="password">password</label>
            </div>
        </div>
        <div class="form-check">
            <input
                type="checkbox"
                class="form-check-input"
                id="savelogin"
                name="savelogin"
            />
            <label for="savelogin" class="form-check-label">save login</label>
        </div>
        <button class="btn btn-primary btn-lg">login</button>
    </form>
    <p class="p-3">
        tidak punya akun? <a
            class="text-blue-600 hover:underline"
            href="/account/register">register</a
        >
    </p>
</div>

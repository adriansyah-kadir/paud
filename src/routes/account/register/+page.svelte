<script lang="ts">
    import DateInput from "$lib/components/form/DateInput.svelte";
    import TextInput from "$lib/components/form/TextInput.svelte";
    import type { ActionData } from "./$types";

    export let form: ActionData;

    let inputclass = "transition-all border bg-white ring-0 hover:ring ring-blue-300 p-2";
</script>

<div>
    <form class="w-full max-w-sm p-5 rounded-lg m-auto my-10" method="post">
        <div class="my-3">
            <h2 class="h2">Daftar Akun</h2>
        </div>
        <p>{form?.message}</p>
        <div class="flex flex-col gap-2">
            <TextInput
                name="username"
                type="float"
                placeholder="username"
                class={inputclass}
                required
                value={form?.data?.username}
            />
            <TextInput
                name="password"
                type="float"
                placeholder="password"
                class={inputclass}
                required
                value={form?.data?.password}
            />
            <DateInput
                name="birthdate"
                type="float"
                placeholder="tggl lahir"
                class={inputclass}
                required
                value={form?.data?.birthdate}
            />
            <TextInput
                name="nip"
                type="float"
                placeholder="NIP"
                class={inputclass}
                value={form?.data?.nip}
            />
            <TextInput
                name="nuptk"
                type="float"
                placeholder="NUPTK"
                class={inputclass}
                required
                value={form?.data?.nuptk}
            />
        </div>
        <div class="flex items-center my-3"><button class="btn btn-primary">Daftar</button></div>
    </form>
</div>

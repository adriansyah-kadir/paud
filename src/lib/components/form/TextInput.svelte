<script lang="ts">
    import { onMount } from "svelte";

    export let placeholder: string = "";
    export let type: string = "text";
    export let name: string;
    export { classname as class };
    export let required = false;
    export let error: string | null = null;
    export let validators: ((arg0: string) => string | null)[] = [];
    export let value: string = "";

    let input: HTMLInputElement;
    let classname = "bg-white px-5 py-2 rounded-sm";

    function update() {
        input.setCustomValidity('')
        if(input.value.length <= 0 && required){
            error = "required"
            return
        }
        for (const func of validators) {
            if(func(input.value)){
                error = func(input.value)
                return;
            }
        }
        error = null
    }

    onMount(() => {
        input.value = value;
        if (input.form) {
            input.form.addEventListener("submit", (ev) => {
                if(error){
                    ev.preventDefault()
                    input.setCustomValidity(error)
                };
            });
        }
    });
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class={classname} on:click={() => input.focus()}>
    <div class="relative flex flex-col-reverse">
        <input
            {required}
            {name}
            bind:this={input}
            {type}
            placeholder=" "
            on:input={update}
            class="outline-none peer bg-transparent placeholder:opacity-0"
        />
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="w-full h-fit text-sm opacity-0">{placeholder}</div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
            on:click={() => input.focus()}
            class="float-label transition-all h-fit opacity-70 peer-focus:opacity-70 peer-placeholder-shown:opacity-100 text-sm absolute left-0 top-0 peer-focus:top-0 peer-focus:translate-y-0 translate-y-0 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-110 scale-100 peer-focus:scale-100 origin-top-left"
        >
            {placeholder}
        </div>
    </div>
    <div>
        {#if error}
            {#if $$slots.error}
                <slot name="error" {error} />
            {:else}
                <div
                    class="bg-red-400 p-2 text-white rounded-sm mt-2 shadow text-xs"
                >
                    {error}
                </div>
            {/if}
        {/if}
    </div>
</div>

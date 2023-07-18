<script lang="ts">
    export let placeholder: string;
    export let type: "label"|"float" = "label";
    export let name: string;
    export {classname as class};
    export let value: string = "";
    export let required = false;

    let input: HTMLInputElement;
    let classname = "bg-white px-5 py-2 rounded-sm"
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="{classname}" on:click={()=>input.focus()}>
    <div class="relative flex flex-col-reverse">
        <input {required} bind:value={value} {name} bind:this={input} type="text" placeholder={type === "float" ? " " : placeholder} class="outline-none peer bg-transparent">
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        {#if type === "float"}
            <div class="w-full h-fit text-sm opacity-0">{placeholder}</div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div on:click={()=>input.focus()} class="float-label transition-all h-fit opacity-70 peer-focus:opacity-70 peer-placeholder-shown:opacity-100 text-sm absolute left-0 top-0 peer-focus:top-0 peer-focus:translate-y-0 translate-y-0 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-110 scale-100 peer-focus:scale-100 origin-top-left">{placeholder}</div>
        {/if}
    </div>
</div>
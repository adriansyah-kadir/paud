<script lang="ts">
    import Calendar from "../icons/Calendar.svelte";
    import TextInput from "./TextInput.svelte";

    export let placeholder = "choose date";
    export let name: string;
    export {classname as class}
    export let type: "float"|"label" = "float";
    export let required = false;
    export let value: string = new Date().toDateString();
    export let error: string|null = null
    export let validators: ((arg0: string)=>string|null)[] = []

    let input: HTMLInputElement;
    let classname = "bg-white px-5 py-2 rounded-sm"
</script>

<div class={classname}>
    <div class="flex items-center">
        <input type="date" class="w-0 h-0 overflow-hidden" bind:this={input} bind:value={value}/>
        <TextInput {validators} {error} {required} class="w-full" {placeholder} {name} {type} bind:value={value}/>
        <button class="h-full" on:click|preventDefault={()=>input.showPicker()}><Calendar/></button>
    </div>
</div>
<script lang="ts">
    import {slide} from "svelte/transition"
    
    export let label: string;

    let open = false;
</script>

<button on:click={()=>open=!open} class="hover:bg-black/10 flex gap-1 items-center py-1 px-2 rounded-md transition-all  w-full">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right transition-all" class:rotate-90={open} viewBox="0 0 16 16">
        <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
    </svg>
    <span class="font-semibold">{label}</span>
</button>
{#if open}
    <div transition:slide={{duration: 300}} class="h-fit">
        <slot/>
    </div>
{/if}
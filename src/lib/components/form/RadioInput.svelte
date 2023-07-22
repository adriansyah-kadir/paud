<script lang="ts">
    export let radios: {label: string, value: string}[] = []
    export let name: string;
    export let label = "";
    export let error: string|null = null
</script>

<div>
    <div class="flex gap-3 items-center">
        <div>{label}:</div>
        {#each radios as radio}
            <div>
                <span>{radio.label}</span>
                <input type="radio" {name} value={radio.value}>
            </div>
        {/each}
    </div>
    <div>
        {#if error}
            <div class="p-2 bg-red-400 text-white text-xs rounded-sm">{error}</div>
        {/if}
    </div>
</div>
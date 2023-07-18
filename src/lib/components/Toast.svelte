<script lang="ts">
    import { onMount } from "svelte";
    import Xmark from "./icons/Xmark.svelte";
    import { translateAndfade } from "$lib/transitions";

    export let label: string;
    export let message: string;

    let hide = true;

    onMount(() => {
        hide = false;
        setTimeout(() => {
            hide = true;
        }, 5000);
    });
</script>

{#if !hide}
    <div class="fixed bottom-3 left-1/2 -translate-x-1/2">
        <div
            transition:translateAndfade
            class="toast show"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
        >
            <div class="toast-header gap-1">
                <slot name="icon" />
                <strong class="me-auto">{label}</strong>
                <button
                    on:click={() => (hide = true)}
                    type="button"
                    class="font-bold btn-close flex items-center justify-center bg-secondary text-white"
                    data-bs-dismiss="toast"
                    aria-label="Close"><Xmark /></button
                >
            </div>
            <div class="toast-body">{message}</div>
        </div>
    </div>
{/if}

<script lang="ts">
    import ListIcon from "./icons/ListIcon.svelte";
    import { fade } from "svelte/transition";
    import { translateAndfade } from "$lib/transitions"
    import Xmark from "./icons/Xmark.svelte";
    import { browser } from "$app/environment";
    import Collapse from "./Collapse.svelte";

    export let links: {
        name: string,
        links: {
            name: string,
            url: string
        }[]
    }[] = []

    let open = false;
    $: if(browser){
        if(open) document.body.style.overflow = "hidden"
        else document.body.style.overflow = "scroll"
    }
</script>

<div
    class="bg-white sticky top-0 left-0 w-full h-14 shadow-sm border flex items-center gap-3 p-3 z-[99]"
>
    <button class="h-full aspect-square p-1 active:bg-black/5 rounded-full" on:click={() => (open = true)}><ListIcon /></button>
    <div class="h-full w-0 border-l" />
    <div class="w-full h-full flex items-center gap-3">
        <img
            src="/logo-paud-berwarna.png"
            alt="logo paud"
            class="h-full aspect-square"
        />
        <a href="/" class="m-0 font-bold">PAUD</a>
    </div>
    <div class="h-full flex items-center gap-3">
        <div class="rounded-full bg-black aspect-square h-full" />
    </div>
</div>
{#if open}
    <div
        class="fixed top-0 left-0 w-screen h-screen z-[100] flex items-start"
    >
        <div transition:fade|global={{duration:300}} class="absolute top-0 left-0 w-full h-full bg-black/50" />
        <div transition:translateAndfade|global={{y: "0%", x: "-100%", opacity: false}} class="relative w-full h-full flex items-start">
            <div class="w-full max-w-xs h-full bg-gradient-to-bl from-blue-600 to-blue-800 px-3">
                <div class="h-14 flex items-center">
                    <h4 class="text-white font-bold">TK Pertiwi</h4>
                </div>
                <ol>
                    {#each links as link}
                        <li class="text-white/75 hover:[&_*]:text-white">
                            <Collapse label={link.name}>
                                <ol class="pl-7">
                                    {#each link.links as l2}
                                        <li><a class="block hover:underline" href="{l2.url}" on:click={()=>open=false}>{l2.name}</a></li>
                                    {/each}
                                </ol>
                            </Collapse>
                        </li>
                    {/each}
                </ol>
            </div>
            <button
                on:click={() => (open = false)}
                class="w-14 p-3 child:h-full child:w-full text-white active:bg-white/5 rounded-full active:scale-90 transition-all"
            >
                <Xmark />
            </button>
        </div>
    </div>
{/if}

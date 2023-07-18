<script lang="ts">
    import { onMount } from "svelte";
    export let images: {
        img: string;
        title?: string;
        desc?: string;
    }[] = [];

    let translateX = 0;
    $: idx = Math.abs(translateX / 100) + 1;

    function slide(dir: number, reset = false) {
        if (idx === 1 && dir > 0) {
            //left
            if (reset) translateX = images.length * 100 * -1;
            return;
        }
        if (idx === images.length && dir < 0) {
            //right
            if (reset) translateX = 0;
            return;
        }
        translateX = translateX + dir * 100;
    }

    onMount(() => {
        setInterval(() => {
            slide(-1, true);
        }, 5000);
    });
</script>

<div class="w-full max-h-80 aspect-video overflow-hidden relative">
    <div
        class="w-full h-full divide-x flex"
        style="transition: transform 0.6s cubic-bezier(0.85, 0, 0.15, 1);transform: translateX({translateX}%);"
    >
        {#each images as image, i}
            <div class="w-full h-full flex-shrink-0 relative [&>.about]:scale-90  [&>.about]:hover:scale-110 [&>.about]:opacity-0  [&>.about]:hover:opacity-100">
                <img
                    class="h-full w-full object-cover"
                    src={image.img}
                    alt=""
                />
                <div
                    class="about transition-all bg-black/20 px-10 py-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                    {#if image.title}
                        <h5
                            class="text-2xl font-bold text-white"
                        >
                            {image.title}
                        </h5>
                    {/if}
                    {#if image.desc}
                        <p
                            class="text-xs text-white rounded"
                        >
                            {image.desc}
                        </p>
                    {/if}
                </div>
            </div>
        {/each}
    </div>
    {#if idx > 1}
        <button
            on:click={() => slide(1)}
            class="bg-white w-10 aspect-square absolute top-1/2 -translate-y-1/2 left-3 rounded-full shadow active:scale-95"
        />
    {/if}
    {#if idx < images.length}
        <button
            on:click={() => slide(-1)}
            class="bg-white w-10 aspect-square absolute top-1/2 -translate-y-1/2 right-3 rounded-full shadow active:scale-95"
        />
    {/if}
</div>

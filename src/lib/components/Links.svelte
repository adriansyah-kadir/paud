<script lang="ts">
    import Collapse from "./Collapse.svelte";

    type Link = {
        name: string;
        links: { name: string; url: string }[];
    };

    export let links: Link[];
</script>

<ol class="w-full">
    {#each links as link}
        <li class="mt-1">
            <Collapse label={link.name}>
                {#each link.links as l2}
                    <a class="hover:underline pl-7" href="{l2.url}">{l2.name}</a>
                {/each}
            </Collapse>
        </li>
    {/each}
</ol>
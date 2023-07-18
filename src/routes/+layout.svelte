<script lang="ts">
    import "bootstrap/dist/css/bootstrap.min.css";
    import "../app.css";
    import Navbar from "$lib/components/Navbar.svelte";
    import type { LayoutServerData } from "./$types";

    export let data: LayoutServerData;

    let links = [
        {
            name: "Shortcut",
            links: [
                {
                    name: "home",
                    url: "/"
                }
            ]
        },
        {
            name: "Akun",
            links: !data.loggedin ? [
                {
                    name: "daftar",
                    url: "/account/register",
                },
                {
                    name: "masuk",
                    url: "/account/login",
                },
            ] : [{name: "profile",url: "/account"},{name: "keluar",url: "/account/logout"}]
        },
        {
            name: "Data",
            links: [
                {name: "daftar hadir (guru)", url: "/data/absen"}
            ]
        }
    ];

</script>

<div class="overflow-x-hidden">
    <Navbar {links} />
    <slot />
</div>

<style>
    :global(body::-webkit-scrollbar) {
        display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    :global(body) {
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
    }
</style>

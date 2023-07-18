<script>
    import Slider from "$lib/components/Slider.svelte";
</script>

<div class="h-full text-center">
    <Slider
        images={[
            { img: "/pertiwi.jpg", title: 'Paud', desc: 'tk pertiwi'}, 
            { img: "/pertiwi.jpg", title: 'Paud', desc: 'tk pertiwi'}, 
            { img: "/pertiwi.jpg", title: 'Paud', desc: 'tk pertiwi'}, 
            { img: "/pertiwi.jpg", title: 'Paud', desc: 'tk pertiwi kjlk lj lk'}, 
        ]}
    />
    <div class="flex flex-col items-center gap-3 px-5 py-10 bg-green-500 justify-center">
        <div class="flex items-center justify-center gap-3">
            <div class="w-10 aspect-squar rounded-md overflow-hidden">
                <img
                    src="/logo-paud-berwarna.png"
                    alt="logo paud"
                    class="h-full w-full"
                />
            </div>
            <h1 class="h1 m-0">TKN Pertiwi</h1>
        </div>
        <p class="max-w-xl text-lg text-white">
            Rwâneka dhâtu winuwus Buddha Wiswa,
            Bhinnêki rakwa ring apan kena parwanosen,
            Mangka ng Jinatwa kalawan Siwatatwa tunggal,
            Bhinnêka tunggal ika tan hana dharma mangrwa.
        </p>
        <div>
            <button class="btn btn-primary">Primary</button>
            <button class="btn btn-secondary">Secondary</button>
        </div>
    </div>
</div>

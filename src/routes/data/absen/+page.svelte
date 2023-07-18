<script>
    async function download(){
        let res = await fetch("/data/absen", {
            method: "POST"
        })
        let file = await res.blob()
        let a = document.createElement("a")
        a.href = URL.createObjectURL(file)
        a.download = "test.xlsx"
        a.click()
    }
</script>

<div>
    Absen Guru
    <button class="btn btn-primary" on:click={download}>download</button>
</div>
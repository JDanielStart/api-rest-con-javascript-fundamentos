
const url = "https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_qCLEUdso1SkWAyZQAzmzaQEVoXDe0Pk5RqDd3K1p5nPsYHs2muoPvMgboWxnFqSn";

const img1 = document.querySelector("#img1");
const img2 = document.querySelector("#img2");
const img3 = document.querySelector("#img3");
const btn = document.querySelector("#recargar");

async function loadFetch (api) {
    const response = await fetch(api);
    const data = await response.json();
    return data;
}

btn.addEventListener("click", async () => {
    const catImg = await loadFetch(url);
    console.log(catImg);
    img1.src = catImg[0].url;
    img2.src = catImg[1].url;
    img3.src = catImg[2].url;
});



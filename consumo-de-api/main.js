
const URL_RANDOM_CATS = "https://api.thecatapi.com/v1/images/search?limit=2";
const URL_FAVORITES_CATS = "https://api.thecatapi.com/v1/favourites";

const img1 = document.querySelector("#img1");
const img2 = document.querySelector("#img2");

const btnRandomCats = document.querySelector("#recargar");
const btnSaveCats = document.querySelector("#guardar1");

const spanError = document.querySelector("#error");

async function loadFetch (api, post = null) {

    let response;

    if (post === null) {
        response = await fetch(api);
    }
    else {
        response = await fetch(api, post);
    }
    
    try {
        if (response.status !== 200) {
            spanError.innerHTML = `Hubo un error ${response.status}`;
            console.log("entro");
        }
        data = await response.json();
    }
    catch(error) {
        console.error(error);
        console.log(data);
    }

    return data;
}

async function loadRandomCats() {
    const catImg = await loadFetch(URL_RANDOM_CATS, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "live_qCLEUdso1SkWAyZQAzmzaQEVoXDe0Pk5RqDd3K1p5nPsYHs2muoPvMgboWxnFqSn"
        }
    });
    img1.src = catImg[0].url;
    img2.src = catImg[1].url;
    console.log(catImg);
}

async function loadFavoritesCats() {
    const catImg = await loadFetch(URL_FAVORITES_CATS, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "live_qCLEUdso1SkWAyZQAzmzaQEVoXDe0Pk5RqDd3K1p5nPsYHs2muoPvMgboWxnFqSn"
        }
    });

    console.log(catImg);
}

async function saveFavoritesCats() {
    const rest = await loadFetch(URL_FAVORITES_CATS, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "live_qCLEUdso1SkWAyZQAzmzaQEVoXDe0Pk5RqDd3K1p5nPsYHs2muoPvMgboWxnFqSn"
        },
        body: JSON.stringify({
            image_id: "4n0"
        })
    });

    

    console.log(rest.message);
    console.log(rest.status);
    console.log(rest);
}

btnRandomCats.addEventListener("click", async () => {
    loadRandomCats();
});

btnSaveCats.addEventListener("click", async () => {
    saveFavoritesCats();
});

loadFavoritesCats();




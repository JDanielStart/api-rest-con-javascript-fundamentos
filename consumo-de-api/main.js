
const URL_RANDOM_CATS = "https://api.thecatapi.com/v1/images/search?limit=2";
const URL_FAVORITES_CATS = "https://api.thecatapi.com/v1/favourites";
const URL_DELETE_CAT = "https://api.thecatapi.com/v1/favourites/";

const spanError = document.querySelector("#error");
const sectionRandoms = document.querySelector("#randomMichis");
const sectionFavorites = document.querySelector("#favoritesMichis");

let randomsCats;
let favoritesCats;

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
        else {
            data = await response.json();
        }
    }
    catch(error) {
        console.error(error);
        console.log(data);
    }

    return data;
}

async function loadRandomCats() {
    randomsCats = await loadFetch(URL_RANDOM_CATS, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "live_qCLEUdso1SkWAyZQAzmzaQEVoXDe0Pk5RqDd3K1p5nPsYHs2muoPvMgboWxnFqSn"
        }
    });

    sectionRandoms.innerHTML = "";

    const h2 = document.createElement("h2");
    const h2Text = document.createTextNode("Michis aleatorios");

    const buttonReload = document.createElement("button");
    const buttonText = document.createTextNode("Recargar michis");

    buttonReload.appendChild(buttonText);
    buttonReload.addEventListener("click", () => loadRandomCats());

    h2.appendChild(h2Text);
    sectionRandoms.appendChild(h2);

    randomsCats.forEach(cat => {

        const article = document.createElement("article");
        const img = document.createElement("img");
        const button = document.createElement("button");
        const buttonText = document.createTextNode("Guardar michi en favoritos");

        button.appendChild(buttonText);
        button.addEventListener("click", () => saveFavoriteCat(cat.id));

        img.src = cat.url;
        img.alt = "Imagen de un michi";
        img.width = 150;

        article.appendChild(img);
        article.appendChild(button);

        sectionRandoms.appendChild(article);
    });

    sectionRandoms.appendChild(buttonReload);

}

async function loadFavoritesCats() {
    favoritesCats = await loadFetch(URL_FAVORITES_CATS, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "live_qCLEUdso1SkWAyZQAzmzaQEVoXDe0Pk5RqDd3K1p5nPsYHs2muoPvMgboWxnFqSn"
        }
    });

    sectionFavorites.innerHTML = "";

    const h2 = document.createElement("h2");
    const h2Text = document.createTextNode("Michis favoritos");
    h2.appendChild(h2Text);
    sectionFavorites.appendChild(h2);

    favoritesCats.forEach(cat => {
        
        const article = document.createElement("article");
        const img = document.createElement("img");
        const button = document.createElement("button");
        const buttonText = document.createTextNode("Sacar al michi de favoritos");

        button.appendChild(buttonText);
        button.addEventListener("click", () => deleteFavoriteCat(cat.id));

        img.src = cat.image.url;
        img.alt = "Imagen de un michi";
        img.width = 150;

        article.appendChild(img);
        article.appendChild(button);

        sectionFavorites.appendChild(article);
    });

    console.log(favoritesCats);
}

async function saveFavoriteCat(id) {
    await loadFetch(URL_FAVORITES_CATS, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "live_qCLEUdso1SkWAyZQAzmzaQEVoXDe0Pk5RqDd3K1p5nPsYHs2muoPvMgboWxnFqSn"
        },
        body: JSON.stringify({
            image_id: id
        })
    });
    loadFavoritesCats();
}

async function deleteFavoriteCat(id) {
    await loadFetch(`${URL_DELETE_CAT}${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "live_qCLEUdso1SkWAyZQAzmzaQEVoXDe0Pk5RqDd3K1p5nPsYHs2muoPvMgboWxnFqSn"
        }
    });
    loadFavoritesCats();
}

loadRandomCats();
loadFavoritesCats();




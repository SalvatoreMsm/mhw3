const PHOTO_LIST_BACKGROUND_NEXT = {array : [],
                                    index : 0};

const fetchUrl = "https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=99";
const api_key = "live_CwvnHQiPVuH4fgPe2KAOCixd8RursYqNmP20inbVyBkWk2ZBU1hxTuSAnpLfNKBJ";
const client_id = 'ae6d306e13e94f9e9afebcfc60552c2f';
const client_secret = '0c549dcc3e0243cca37f2e5cea4523e8';

/* FUNZIONI DELLA FETCH PER IL TOKEN */

function onTokenResponse(response)
{
  return response.json();
}

function onTokenJson(json)
{
  token = json.access_token;
  console.log(token);
}


/* FUNZIONI DELLA FETCH SU > */

function onSuccess(response){
    console.log(response.status);
    if (!response.ok){
        console.log("response non valida!");
        return null;
    }
    else
    return response.json();
}
function onError(response){
    console.log("errore: " + Error);
    return null
}

function onJsonG(json){
    console.log(json);
    for(let indice = 0; indice < 99; indice++){
    PHOTO_LIST_BACKGROUND_NEXT.array[indice] = "url(" + json[indice].url + ")";
    PHOTO_LIST_BACKGROUND_NEXT.index++;}
}

/*    FUNZIONE CLICK SU LENTE  */

function onLente(event){
    const l = event.currentTarget;

//    INSERIMENTO DELLA SEARCH VIEW NEL BLOCCO #CONTENT

    search_viewAppend.classList.remove('hidden');
    search_view.classList.remove('hidden');
    search_viewAppend.appendChild(search_view);
    console.log(search_view);

// AGGIUNGIAMO L'EVENT LISTENER SUBMIT AL FORM

    form.addEventListener('submit', search);

    l.classList.add('hidden');
    for(let items of item){
        items.classList.add('hidden');
    }
    searchBar.classList.remove('hidden'); 
    blocco_x.classList.remove('hidden');
    blocco_x.classList.add('inlineBlock');
    const x = document.createElement('img');
        x.setAttribute('id','x');
        x.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Red_X.svg/2048px-Red_X.svg.png';
        blocco_x.appendChild(x);
        x.addEventListener("click", onX); 
}

/* FUNZIONE CLICK SU X */

function onX(event){
    blocco_x.innerHTML = '';
    search_viewAppend.innerHTML = '';
    search_view.innerHTML = '';
    blocco_x.classList.add('hidden');
    blocco_x.classList.remove('inlineBlock');
    for(let items of item){
        items.classList.remove('hidden');
    }
    console.log(event.  currentTarget);  
    console.log(event);
    searchBar.classList.add('hidden');
    lente.classList.remove('hidden');
    
}

/* FUNZIONE DI SERACH DOPO IL SUBMIT */

function search(event){
    event.preventDefault();
    const album_input = formText;
    const album_value = encodeURIComponent(album_input.value);
    console.log('ricerca su :' + album_value);

    fetch("https://api.spotify.com/v1/search?type=album&q=" + album_value,
    {
      headers:
      {
        'Authorization': 'Bearer ' + token
      }
    }
  ).then(onResponse).then(onJson);
}

function onJson(json){

    console.log('json ricevuto');
    search_view.innerHTML = '';
    const albums = json.albums.items;
    let num_results = albums.length;
    if(num_results > 5) num_results = 5;
    for(let i = 0; i < num_results; i++){
        const album_res = albums[i];
        const title = album_res.name;
        const selected_image = album_res.images[0].url;
        const album = document.createElement('div');
        album.classList.add('search_view_element');
        const img_alb = document.createElement('img');
        img_alb.src = selected_image;
        const caption = document.createElement('span');
        caption.textContent = title;
        album.classList.add('search_view_element');
        img_alb.style.height = '100%';
        img_alb.style.width = '100%';
        album.appendChild(img_alb);
        album.appendChild(caption);
        search_view.appendChild(album);
    }
}

function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
  }

/* FUNZIONE CLICK SU > */

function forward(event){



        for(let i = 0; i < 3; i++){

                let item = item_riga[i];
                let image = item.querySelector('.immagine');
                image.dataset.image= parseInt(image.dataset.image)+3;
                let indice = PHOTO_LIST_BACKGROUND_NEXT.index--;
                console.log(PHOTO_LIST_BACKGROUND_NEXT);
                image.style.backgroundImage = PHOTO_LIST_BACKGROUND_NEXT.array[image.dataset.image];
                
        }
        /*event.currentTarget.removeEventListener("click", forward);
        event.currentTarget.classList.add('hidden');
        bottone_premuto = event.currentTarget;*/

}

/* FUNZIONE CLICK SU < */

function backward(event){
    for(let i = 0; i < 3; i++){
        let item = item_riga[i];
        let image = item.querySelector('.immagine');
        image.dataset.image= parseInt(image.dataset.image)-3;
        let indice = PHOTO_LIST_BACKGROUND_NEXT.index++;
        image.style.backgroundImage = PHOTO_LIST_BACKGROUND_NEXT.array[image.dataset.image];

    }
   /* next_button.addEventListener("click", forward);
    bottone_premuto.classList.remove('hidden');*/

}


/* SELEZIONE ELEMENTI */

const lente = document.querySelector('.item_h_in_lente');
const searchBar = document.querySelector('#search_bar');
const item = document.querySelectorAll('.item_h_in');
let bottone_premuto;
const item_riga = Array.from(document.querySelectorAll('.item_riga'));
console.log(item_riga);

//CREAZIONE DELLA SEARCH_VIEW

const search_view = document.createElement('div');
search_view.classList.add('search_view')
search_view.classList.add('hidden');
console.log(search_view);
const search_viewAppend = document.querySelector('#search_viewAppend');

//SELEZIONE FORM

const form = document.querySelector('form');
const formText = document.querySelector('#ricerca');

//CREAZIONE E RICHIESTA DEL TOKEN ALL'APERTURA DELLA PAGINA

let token;

fetch("https://accounts.spotify.com/api/token",
	{
   method: "post",
   body: 'grant_type=client_credentials',
   headers:
   {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
   }
  }
).then(onTokenResponse).then(onTokenJson);

//const x = document.querySelector('#x');
const blocco_x = document.querySelector('.container_x');
blocco_x.classList.add('hidden');
next_button = document.querySelector('#next_button');
const previous_button = document.querySelector('#previous_button');

/* CREAZIONE LISTENER */

lente.addEventListener("click", onLente);
next_button.addEventListener("click", forward);
previous_button.addEventListener("click", backward);

/* FETCH DELLE TRE IMMAGINI DI GATTI */

fetch(fetchUrl, {headers:{
    'x-api-key': api_key
}}).then(onSuccess, onError).then(onJsonG);
console.log(PHOTO_LIST_BACKGROUND_NEXT);
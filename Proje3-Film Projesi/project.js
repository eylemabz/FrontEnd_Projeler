const form=document.getElementById("film-form");
const titleElement=document.querySelector("#title"); // query selector yerine getElementById de kullanabiliriz.
const directorElement=document.querySelector("#director");
const urlElement=document.querySelector("#url");
const cardBody=document.querySelectorAll(".card-body")[1];
const clear=document.getElementById("clear-films");


//UI Objesini Başlatma
const ui=new UI();

//Storage Objesi üretme
const storage=new Storage();


//Tüm Eventleri Yükleme
eventListener();

function eventListener(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
      let films=storage.getFilmsFromStorage();
      ui.loadAllFilms(films);
    });

    cardBody.addEventListener("click",deleteFilm);

    clear.addEventListener("click",clearAllFilms);
}
function addFilm(e){

  const title=titleElement.value;
  const director=directorElement.value;
  const url=urlElement.value;


  if(title==="" || director==="" || url===""){

    //Hata 

    ui.displayMessage("Tüm Alanları Doldurun...","danger");

 
  }else{
    //Yeni Film 
    const newFilm=new Film(title,director,url);

    ui.addFilmToUI(newFilm); //Arayüze film ekleme
    storage.addNewFilmToStorage(newFilm); //Storage a film ekleme
    ui.displayMessage("Film Başarıyla Eklendi","success");

  }



  ui.clearInput(titleElement,directorElement,urlElement);
  e.preventDefault();
}

function deleteFilm(e){
  if(e.target.id==="delete-film"){
    ui.deleteFilmFromUI(e.target);

    storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
    ui.displayMessage("Silme İşlemi Başarılı","success");
  }
}

function clearAllFilms(){
  if(confirm("Emin misiniz?")){
    ui.clearAllFilmsFromUI();
    storage.clearAllFilmsFromStorage();
  }
  
}
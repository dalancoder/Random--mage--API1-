const cardDiv = document.getElementById("cardDiv");
const loadingDiv = document.getElementById("loading");
const btn = document.querySelector(".btn");
const containerDiv = document.querySelector(".container");
const tarih = document.getElementById("tarih");

const find = document.querySelector("#find");

/* ---------------------------------- */
/*         loading çalıştırma         */
/* ---------------------------------- */



setTimeout(()=>{
    loadingDiv.style.display="none"
    containerDiv.style.display = "flex"
    containerDiv.classList.remove("d-none")
    find.focus()
},3000)

/* ---------------------------------- */
/*           tarih belirleme          */
/* ---------------------------------- */

setInterval(()=>{
    const now = new Date();
    const day = now.getDate();
const month = now.getMonth() + 1; // Aylar 0'dan başladığı için 1 ekliyoruz
const year = now.getFullYear();
const hours = now.getHours();
const minutes = now.getMinutes();
const seconds = now.getSeconds();
const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

tarih.textContent=formattedDate;
  },1000)



/* ---------------------------------- */
/*          verileri getirme          */
/* ---------------------------------- */
function cats() {
  cardDiv.innerHTML = `<img src="./img/loading.gif"/>`;
  fetch(
    `https://pixabay.com/api/?key=45224779-712f943f3d7c809209751790f&q=${
      find.value
    }&image_type=photo&pretty=true&per_page=10&page=${
      Math.floor(Math.random() * 10) + 1
    }`
  )
    .then((res) => {
      
      if (!res.ok) {
        throw new Error("Error");
      }
      return res.json();
    })
    .then((data) => showCat(data))
    .catch((err) => {
      cardDiv.innerHTML = `<img src="./img/error.gif" />`;
    });
}

/* ---------------------------------- */
/*     butona tıklanınca ve entera basılınca yeni resim gelmesi     */
/* ---------------------------------- */
btn.onclick = () => {
  cats();
};
document.body.addEventListener("keydown",(e)=>{
    console.log(e);
    if(e.key=="Enter"){
        cats()
        
    }
})

/* ---------------------------------- */
/*            resimleri çiz           */
/* ---------------------------------- */
function showCat({ hits }) {
  cardDiv.innerHTML = "";
  find.focus()
  hits.forEach(({ largeImageURL, tags, user }) => {
    cardDiv.innerHTML += `
  <div class="card" style="width: 18rem; border-radius:20px; "><a data-fslightbox="gallery" target="_blank" href="${largeImageURL}">
  <img src="${largeImageURL}" class="img-thumbnail" style="height:200px; width:100%;" alt="Image"/></a>
  <div class="card-body">
    <h5 class="card-title">Tag: ${tags.split(",")[0]}</h5>
    <p class="card-text">Username: ${user}</p>
  </div>
</div>`;
  });

}


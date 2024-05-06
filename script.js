

console.log('shubham');


const API_KEY="b063fa014e9f46e6990a10b2c9c89b24";
 const url="https://newsapi.org/v2/everything?q=";
//  const url="https://streaming-availability.p.rapidapi.com/countries";

window.addEventListener("load",()=>fetchNews("India"));

function reload(){
    window.location.reload();
}

async function fetchNews (query){
    const res=await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data=await res.json();
    // console.log(data);
    bindData(data.articles);
}
function bindData(articles){
    const cardsContainer=document.getElementById("cards-container");
    const newsCardTemplate=document.getElementById("template-news-card");
    cardsContainer.innerHTML="";

    articles.forEach((article) => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
                         fd(cardClone,article);
        cardsContainer.appendChild(cardClone);
});
}

 function fd(cardClone,article){
    const newsImg=cardClone.querySelector("#news-img");
     const newsTitle=cardClone.querySelector("#news-title");
     const newsSource=cardClone.querySelector("#news-source");
     const newsDesc=cardClone.querySelector("#news-desc");


 newsImg.src=article.urlToImage;
 newsTitle.innerHTML=article.title;
 newsDesc.innerHTML=article.description;

 const date=new Date(article.publishedAt).toLocaleString("en-Us",{timeZone:"Asia/Jakarta"
});
  newsSource.innerHTML=`${article.source.name}.${date}`;
     
  cardClone.firstElementChild.addEventListener('click',() =>{
       window.open(article.url,"_blank");
  })
 }
 let cur=null;

function onNavItemClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);
    cur?.classList.remove('active');
    cur=navItem;
    cur.classList.add('active');
}
const searchButton=document.getElementById('search-button');
const searchText=document.getElementById('news-input')

searchButton.addEventListener('click',()=>{
    const query=searchText.value;
    if(!query)return;
    fetchNews(query);
  cur?.classList.remove('active');
  cur=null;
});
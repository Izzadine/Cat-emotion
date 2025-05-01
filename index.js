import { catsData } from "/data.js";

const emotionRadios = document.getElementById("emotion-radios");
const getImageBtn = document.getElementById("get-image-btn");
const gifsOnlyOption = document.getElementById("gifs-only-option")
const memeModal = document.getElementById("meme-modal");
const memeModalInner = document.getElementById("meme-modal-inner");
const memeModalCloseBtn =document.getElementById("meme-modal-close-btn");


function getCatEmotionArray(cats) {
  const catEmotions = [];
  for (let cat of cats) {
    for (let emotion of cat.emotionTags) {
      if (!catEmotions.includes(emotion)) {
        catEmotions.push(emotion);
      }
    }
  }
  return catEmotions;
}

function getMatchingCatsArray(){
    if(document.querySelector('input[type="radio"]:checked')){
     const selectedEmotion = document.querySelector('input[type="radio"]:checked').value;
     const isGif= gifsOnlyOption.checked;

      const matchingCats = catsData.filter(cat => {

        if (isGif) {
          return cat.isGif && cat.emotionTags.includes(selectedEmotion);
        }
        return cat.emotionTags.includes(selectedEmotion);
      });

      return matchingCats;

      


    }

}

function getSingleObject(){
    const catsArray = getMatchingCatsArray();
    if(catsArray.length === 1){

        return catsArray[0]
    }else{
        const randomIndex = Math.floor(Math.random() * catsArray.length);
        return catsArray[randomIndex];
        
    }

}

function renderCat(){
    const catObject= getSingleObject();
    // console.log(catObject.isGif);

    memeModalInner.innerHTML = `
        <img 
        class="cat-img"
        src="/images/${catObject.image}"
         
        alt="${catObject.alt}">`

    memeModal.style.display = "flex";    
}

function renderEmotionsRation(cats) {
  const emotions = getCatEmotionArray(cats);
  for (let emotion of emotions) {
    emotionRadios.innerHTML += `
           <div class="radio">
                <label for="${emotion}">${emotion}</label>
                 <input type="radio" 
                    id="${emotion}"
                    name="emotion"
                    value="${emotion}"
                 >
           </div>
       `;
  }
}

emotionRadios.addEventListener("change", higghtLightOptioon);

function higghtLightOptioon(e) {
  const radios = document.getElementsByClassName("radio");
  for (let radio of radios) {
    radio.classList.remove("highlight");
  }
  document.getElementById(e.target.id).parentElement.classList.add("highlight");
}

getImageBtn.addEventListener("click", renderCat);

memeModalCloseBtn.addEventListener("click", function () {
  memeModal.style.display = "none";
}
);



renderEmotionsRation(catsData);

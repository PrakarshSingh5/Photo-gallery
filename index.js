const btnEl=document.getElementById("btn")
const errorMessageEl=document.getElementById("errorMessage")
const galleryEle=document.getElementById("gallery")
async  function fetchImage(){
    const inputValue=document.getElementById("input").value
    if(inputValue>100||inputValue<1){
        errorMessageEl.style.display="block";
        errorMessageEl.innerText="Number should be between 0 and 11";
        return 
    }
    imgs="";
    try{
        btnEl.style.display="none";
        const loading =`<img src="spinner.svg" />`;
        galleryEle.innerHTML=loading;
        await fetch(`https://api.unsplash.com/photos?per_page=${inputValue}&page=${Math.round(Math.random()*1000)}&client_id=KxUEaG7dg97QkSuBt2-aypeWWNbGu1wJZNCrlInjDHk`).then((res)=>res.json().then((data)=>{
            if(data){
                data.forEach((pic)=>{
                    imgs+=`
                    <img src=${pic.urls.small} alt="image"/>`;
                    galleryEle.style.display="block";
                    galleryEle.innerHTML=imgs;
                    btnEl.style.display="block";
                })
            }
            
        }));
        errorMessageEl.style.display="none";
    }catch(error){
        errorMessageEl.style.display="Block";
        errorMessageEl.innerText="An error happened, try again later"
    }
    
} 
btnEl.addEventListener("click", fetchImage)
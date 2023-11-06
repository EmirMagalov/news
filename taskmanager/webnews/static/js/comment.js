ul=document.querySelector(".first")
com=document.querySelectorAll(".authusercomm")

ul.querySelectorAll(".authusercomm").forEach(f=>{

if (f) {
ul.insertBefore(f, ul.firstChild);
}

})

comments=document.querySelector(".comments")

document.addEventListener("click",f=>{
if(f.target.dataset.action=="response"){
    cl=f.target.closest(".liresp")
     respuser=cl.querySelector('.respuser').innerText
      comments.querySelector('.commenttext').value=`@${respuser} `
      comments.querySelector(".inputresp").value=cl.querySelector(".commid").innerText
      console.log(cl.querySelector(".commid").innerText)



}
if(f.target.dataset.action=="public"){

if(comments.querySelector('.commenttext').value[0]=="@"){
console.log("ok")
    comments.querySelector('form').action="/respcomm"

}
else{
 cl=f.target.closest(".card")
 comments.querySelector(".inputresp").value=cl.getAttribute("data-id")
  comments.querySelector('form').action="/comment"
}
}

if(f.target.dataset.action=="responseincomm"){
cl=f.target.closest(".liresp")
respuser=cl.querySelector('.respcomm').innerText
 comments.querySelector('.commenttext').value=`@${respuser}`
  comments.querySelector(".inputresp").value=cl.querySelector(".commid").innerText
}

})
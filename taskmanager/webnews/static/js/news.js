
a=document.querySelectorAll(".like")
a.forEach(f => {
//console.log(f)
b=document.querySelector(`[data-id='${f.innerText}']`)
if(b){
l=b.querySelector("i")
l.className="fa fa-heart"
l.style="color:red;"
}
})




//likesjszaeb//

document.addEventListener("click",f=>{
if(f.target.dataset.action=="likebutton"){
 form=f.target.closest("form")
 f.preventDefault()
var csrfToken = document.getElementsByName('csrfmiddlewaretoken')[0].value;
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
$.ajax({
    type:form.method,
   headers: {'X-CSRFToken': csrftoken},
    url:form.action,
    data:$(form).serialize(),
    success:function(response){
     st=f.target.closest("i")
     c=f.target.closest(".card").querySelector(".count")
     if(st.className=="fa fa-heart"){
     st.className="fa fa-heart-o"
       st.style="color:black"
       c.innerText=parseInt(c.innerText)-1
     }
     else if(st.className=="fa fa-heart-o"){
      st.className="fa fa-heart"
      st.style="color:red"
     c.innerText=parseInt(c.innerText)+1
     }

    },
    error:function(response){
    console.log("neOK",response)
    }
    })
    }
})

// scrollzaeb


try{
len=document.querySelector(".len").innerText
page=2
//response=[]
document.addEventListener("scroll",f=>{
if(page<=Math.ceil(len/3) && (window.innerHeight + window.scrollY >= document.body.offsetHeight) ){
 $.get(window.location.href+'/?page='+page, function (data) {


     var card = new DOMParser().parseFromString( data, "text/html").querySelectorAll(".card-container")
     card.forEach(f=>{
      const i={
        id:f.querySelector(".card").dataset.id,
        img:f.querySelector("img").getAttribute("src"),
        name:f.querySelector(".name").innerText,
        desc:f.querySelector(".desc").innerText,
        count:f.querySelector(".count").innerText,
        tags:f.querySelectorAll(".tags")

       }
       let result = ""
       i.tags.forEach(j=>{
        result +=`<a class="tags" href="${j.getAttribute('href')}"> ${j.innerText}</a>`
       })
        if(document.querySelector(".user")){
        var cardItem=`
        <div class="card-container">
        <div class="card" data-id="${i.id}">
        <img src="${i.img}" alt="">
        <h3 class="name">${i.name}</h3>
        <p class="desc">${i.desc}</p>
        ${result}
         <div class="likecount">
        <form method="POST" action="/like">

        <input type="hidden" value="${i.id}" name="like">

        <button data-action="likebutton" class="likebutton" type="submit" ><i data-action="likebutton" class="fa fa-heart-o"></i></button>
        </form>
        <p class="count">${i.count}</p>
        </div>
        </div>
        </div>
        `;
}
else{
        var cardItem=`
        <div class="card-container">
        <div class="card" data-id="${i.id}">
        <img src="${i.img}" alt="">
        <h3 class="name">${i.name}</h3>
        <p class="desc">${i.desc}</p>
        #${result}
         <div class="likecount">
        <form method="post" action="/like">
        <input type="hidden" value="${i.id}" name="like">

        <div class="likeauthnot">
         <a href="/registr"><i class="fa fa-heart-o"></i></a>
            </div>
        </form>
        <p class="count">${i.count}</p>
        </div>
        </div>
        </div>
        `;

}
     document.querySelector(".box").insertAdjacentHTML("beforeend",cardItem)
a.forEach(f => {

b=document.querySelector(".box").querySelector(`[data-id='${f.innerText}']`)
if(b){
l=b.querySelector("i")
l.className="fa fa-heart"
l.style="color:red;"
}
})

//    response.push("1")
 })

// }
})
 page++
}


})


}
catch(err){
console.log("ok")
}



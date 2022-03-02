function cnl(){
    for (const arg of arguments) {
        console.log(arg)
    }
}

//showallsearh
const showallsearh= () =>{
    const show = document.getElementsByClassName('show');
    const showallbtn = document.getElementById('showallbtn');
    for (let index = 0; index < show.length; index++) {
        const el = show[index];
        el.style.display=""
    }
    showallbtn.style.display="none"
}
// gloval declaration 
const single_result= document.getElementById('single_result');
const spiner= document.getElementById('spiner');

// search phone 
const searchMobile =() => {

    const seacrh= document.getElementById('search_word').value;
    spiner.style.display="";
    fetch(`https://openapi.programming-hero.com/api/phones?search=${seacrh}`)
        .then(res => res.json())
        .then(data=> show_result(data));
}
 // show all result
const show_result =(data)=>{
    const search_box= document.getElementById('search_box');
if (data.data.length > 0) {
    console.log(data.data)
    search_box.textContent="";
    single_result.textContent="";

    for (let index = 0; index < data.data.length; index++) {
        const element = data.data[index];
        const div= document.createElement("div");
        //div.setAttribute('id','');
        if (index >= 20) {
            div.style.display="none";
            let i=0;
            if(i<1){
            document.getElementById('showallbtn').classList.remove('d-none')
                i++
            }
        }
        div.classList.add("col","show");
        div.innerHTML= `             
        <div class="card m-4">
            <img style="width: 300px;" src="${element.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h4 class="card-title">${element.phone_name}</h4>
            <h5 class="card-title">Brand: ${element.brand}</h5>
            <a herf="#single_result>" <button  onclick='single_product("${element.slug}")' class="btn btn-primary">show details</button> </a>
            </div>
        </div>        
    `;
    search_box.appendChild(div);
    }
 
    spiner.style.display="none";

}else{
    spiner.style.display="none";
    search_box.innerText="No Result Found";


}


}


//single search

function single_product (id){
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then(res => res.json())
    .then(data=> show_single_result(data));
}

//show_single_result
 const show_single_result = (data)=>{
     const phone= data.data;
     console.log(phone);

     const releaseDate=phone.releaseDate || "No releaseDate found";
     single_result.classList.add('row')
     single_result.innerHTML=`
     <!-- div class="col">
       <img src="${phone.image}" class="card-img-top" alt="...">
     </div>
     <div class="card-body col">
       <h5 class="card-title">${phone.name}</h5>
       <h5 class="card-title">Released: ${releaseDate}</h5>
       <p id='mainFeatures' class="card-text"></p>
       <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>     
     </div -->  

    <div class="col-md-6">
        <img width="400px" src="${phone.image}" class="img-fluid rounded-start" alt="${phone.image}">
    </div>
    <div class="col-md-6">
        <div class="card-body">
        <h5 class="card-title">${phone.name}</h5>
        <p class="card-text">${releaseDate}</p>
        <p id="mainFeatures" class="card-text"></p>
        </div>
    </div>
     `;


     const mnf=document.getElementById("mainFeatures");
if (phone.mainFeatures) {
     Object.entries(phone.mainFeatures).forEach(([key, value]) => {
        //console.log(key, value) 
        const feature= document.createElement("p");
        feature.innerHTML =`${key} : ${value}`;
        //console.log(feature)
        //cnl(feature)
        
        mnf.appendChild(feature);
    })
}
    if (phone.others) {
    Object.entries(phone.others).forEach(([key, value]) => {
        //console.log(key, value) 
        const feature= document.createElement("p");
        feature.innerHTML =`${key} : ${value}`;
        //console.log(feature)
        //cnl(feature)
        
        mnf.appendChild(feature);
    })
}

 }

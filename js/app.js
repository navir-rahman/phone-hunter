function cnl(){
    for (const arg of arguments) {
        console.log(arg)
    }
}


// search phone 
const searchMobile =() => {

    const seacrh= document.getElementById('search_word').value
    fetch(`https://openapi.programming-hero.com/api/phones?search=${seacrh}`)
        .then(res => res.json())
        .then(data=> show_result(data));
}

//single search

function single_product (id){
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then(res => res.json())
    .then(data=> show_single_result(data));
}

//show_single_result
 const show_single_result = (data)=>{
     console.log(data)
 }

const show_result =(data)=>{
    //console.log(data.data)
    
    const search_box= document.getElementById('search_box');
    search_box.textContent="";
    for (const phone of data.data) {
        cnl(phone)
        const div= document.createElement("div");
        div.setAttribute('id',phone.slug);
        div.setAttribute('onclick',"single_product(this.id)");
        div.classList.add("col");
        
        div.innerHTML= `             
        <div class="card">
        <img width="400px" src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        </div>
        </div>
    `;
    search_box.appendChild(div);
    }
}

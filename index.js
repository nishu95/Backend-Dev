const form = document.getElementById('form');
form.addEventListener('submit',operation);
const userList = document.getElementById('list');
userList.addEventListener('click',change);

async function operation(e){
    e.preventDefault();
    console.log("inside operation function");
    const object = {
        itemname:e.target.itemname.value,
        description:e.target.description.value,
        price:e.target.price.value,
        quantity:e.target.quantity.value
    }
    try{
        const response = await axios.post('http://localhost:7200/admin',object);
        addToList(response.data);
        form.reset();
        document.location.reload();
    }catch(err){console.log(err);}
}

function addToList(ProjectData){
    let li=document.createElement('li');
    li.id=ProjectData.id;
    let ul=document.getElementById(ProjectData.table);
    li.innerHTML = `${ProjectData.itemname}   ${ProjectData.description}   Rs/-${ProjectData.price} remaining: ${ProjectData.quantity} 
    <button  class="delete btn btn-sm btn-danger">DELETE</button> <button  class="b1 btn btn-sm btn-dark">BUY1</button>
    <button  class="b2 btn btn-sm btn-dark">BUY2</button>  <button  class="b3 btn btn-sm btn-dark">BUY3</button>`;
    
    userList.appendChild(li);
}

window.addEventListener('DOMContentLoaded',async ()=>{
    try{
        const oldData = await axios.get('http://localhost:7200/admin');
        for(let i=0; i<oldData.data.length; i++){
            addToList(oldData.data[i]);
        }
    }catch(err){console.log(err);}
});

async function change(e){
    e.preventDefault();
    let li = e.target.parentElement;
    let userId = li.id;
    if(e.target.classList.contains('delete')){
        console.log(li);
        try{
            await axios.delete(`http://localhost:7200/delete/${userId}`);
            userList.removeChild(li);
            document.location.reload();
        }catch(err){console.log(err);}
    }
    if(e.target.classList.contains('b1')){
        try{
            const res= await axios.get(`http://localhost:7200/buy1/${userId}`);
            console.log("javascript response is:",res.data);
            document.location.reload();
        }catch(err){console.log(err);}
    }
    if(e.target.classList.contains('b2')){
        try{
            const res= await axios.get(`http://localhost:7200/buy2/${userId}`);
            console.log("javascript response is:",res.data);
            document.location.reload();
        }catch(err){console.log(err);}
    }
    if(e.target.classList.contains('b3')){
        try{
            const res= await axios.get(`http://localhost:7200/buy3/${userId}`);
            console.log("javascript response is:",res.data);
            document.location.reload();
        }catch(err){console.log(err);}
    }
}
const form=document.getElementById('form');
form.addEventListener('submit',operation);
const userList = document.getElementById('list');
userList.addEventListener('click',change);

async function operation(e){
    e.preventDefault();
    console.log("inside adding operation function");

    const obj={
        expense:e.target.exp.value,
        description:e.target.desc.value,
        category:e.target.cat.value
    }
    console.log(obj);

    try{
        const newData = await axios.post('http://localhost:7100/expense',obj);
        addToList(newData.data);
        form.reset();
    }catch(err){console.log(err);}
}

function addToList(object){
    const li = document.createElement('li');
    li.id = object.id;
    li.innerHTML = `${object.expense}-${object.description}-${object.category}
    <button class="edit btn-sm">EDIT</button> <button class="delete btn-sm">DELETE</button>`;
    userList.appendChild(li);
}

document.addEventListener('DOMContentLoaded',async ()=>{
    try{
        const oldDatalist = await axios.get('http://localhost:7100/expense');
        for(let i=0;i<oldDatalist.data.length;i++){
            addToList(oldDatalist.data[i]);
        }
    }
    catch(err){console.log(err);}
    
});

async function change(e){
    e.preventDefault();
    const li= e.target.parentElement;
    const userId=li.id;

    if(e.target.classList.contains('delete')){
        console.log(li);
        try{
            await axios.delete(`http://localhost:7100/delete/${userId}`);
            userList.removeChild(li);
        }catch(err){console.log(err);}
        
    }
    if(e.target.classList.contains('edit')){
        console.log(li);
        try{
            const res = await axios.get(`http://localhost:7100/edit/${userId}`);
            console.log("res.data is:",res.data);
            document.getElementById('exp').value = res.data.expense;
            document.getElementById('desc').value = res.data.description;
            document.getElementById('cat').value = res.data.category;

            await axios.delete(`http://localhost:7100/delete/${userId}`);
            userList.removeChild(li);

        }catch(err){console.log(err);}
    }

}
const form=document.getElementById('form');
form.addEventListener('submit',operation);
const userList = document.getElementById('list');
userList.addEventListener('click',change);
const table = document.getElementById('table');
table.addEventListener('click',change2);

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
    document.location.reload();
}

function addToList(object){
    const li = document.createElement('li');
    li.id = object.id;
    li.innerHTML = `${object.expense}-${object.description}-${object.category}
    <button class="edit btn-sm">EDIT</button> <button class="delete btn-sm">DELETE</button>`;
    userList.appendChild(li);

    const tr = document.createElement('tr');
    tr.id = object.id;
    const t1 = document.createElement('td');
    t1.innerHTML = `${object.expense}`;
    const t2 = document.createElement('td');
    t2.innerHTML = `${object.description}`;
    const t3 = document.createElement('td');
    t3.innerHTML = `${object.category}`;
    const t4 = document.createElement('td');
    t4.innerHTML = `<button class="edit btn-sm">EDIT</button>`; 
    const t5 = document.createElement('td');
    t5.innerHTML = `<button class="delete btn-sm">DELETE</button>`;
    tr.appendChild(t1);
    tr.appendChild(t2);
    tr.appendChild(t3);
    tr.appendChild(t4);
    tr.appendChild(t5);
    table.appendChild(tr);

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
            document.location.reload(); 
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

async function change2(e){
    e.preventDefault();
    const tr= e.target.parentElement.parentElement;
    const userId=tr.id;
    if(e.target.classList.contains('delete')){
        try{
            await axios.delete(`http://localhost:7100/delete/${userId}`);
            table.removeChild(tr);
            document.location.reload();
        }catch(err){console.log(err);}
    }
    if(e.target.classList.contains('edit')){
        console.log(tr);
        try{
            const res = await axios.get(`http://localhost:7100/edit/${userId}`);
            console.log("res.data is:",res.data);
            document.getElementById('exp').value = res.data.expense;
            document.getElementById('desc').value = res.data.description;
            document.getElementById('cat').value = res.data.category;

            await axios.delete(`http://localhost:7100/delete/${userId}`);
            table.removeChild(tr);

        }catch(err){console.log(err);}
        
    }
    
}
const form=document.getElementById('form');
form.addEventListener('submit',addUser);
const userList=document.getElementById('userList');
userList.addEventListener('click',change);

// function to user in database and linn the list
async function addUser(event){
    event.preventDefault();
    console.log("inside adduser function");
    const obj={
      userName:event.target.name.value,
      phoneNumber:event.target.phone.value,
      email:event.target.email.value
    }
    try{
        const user= await axios.post('http://localhost:7000/add-user',obj);
        addToUserList(user.data);
        form.reset();

    }catch(e){console.log(e);}
}

// function to add user data to the frontend list
function addToUserList(userData){

    console.log('inside show appointment function');
    const newUser = document.createElement('li');
    newUser.id=userData.id;
    newUser.innerHTML = `${userData.userName} ${userData.phoneNumber} ${userData.email}
    <button class="edit btn-sm btn-dark m-1">Edit</button> <button class="delete btn-sm btn-danger m-1">Delete</button>`;
    userList.append(newUser);
   
}

window.addEventListener('DOMContentLoaded',async ()=>{
    try{
        const users = await axios.get('http://localhost:7000/add-user');
        for(let i=0;i<users.data.length;i++){
            addToUserList(users.data[i]);
        }
    }catch(e){console.log(e)}
    
});

async function change(e){
    e.preventDefault();
    const li=e.target.parentElement;
    userId=li.id;
    if(e.target.classList.contains('delete')){
        console.log(li);
        userList.removeChild(li);
        try{
            await axios.delete(`http://localhost:7000/delete/${userId}`);
        }catch(e){console.log(e);}
    }
    if(e.target.classList.contains('edit')){
        try{
            const res = await axios.get(`http://localhost:7000/edit/${userId}`);
            document.getElementById('name').value = res.data.userName;
            document.getElementById('email').value = res.data.email;
            document.getElementById('phone').value = res.data.phoneNumber;

            await axios.delete(`http://localhost:7000/delete/${userId}`);
            userList.removeChild(li);

        }catch(e){console.log(e);}
    }
    
} 
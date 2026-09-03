var cl=console.log;

const form=document.getElementById("form");
const formInput1=document.getElementById("formInput1");
const formInput2=document.getElementById("formInput2");
const list=document.getElementById("list");
const submitButton=document.getElementById("submitButton")
 const updateButton=document.getElementById("updateButton");

// let array1=[{id:"1",name:"vaishali",dob:"01/04/1998"}];
// localStorage.setItem("array1",JSON.stringify(array1));

let array1=JSON.parse(localStorage.getItem("array1"))||[];
cl(array1);
function ShowData(eve) {
    let result=``;
    eve.forEach((ele) =>{
        result+=` <li class="list-group-item d-flex justify-content-between align-items-center"id="${ele.id}">
                            <strong>${ele.name}</strong> 
                             <strong>${ele.dob}</strong>
                            <div>  
                                <i onclick="OnEdit(this)" class="fa-solid fa-pen-to-square fa-2x text-primary"></i>
                                <i onclick="OnDlt(this)" class="fa-solid fa-trash fa-2x fa-2x text-danger"></i> 
                       
                             </div> 
                         </li>

        `
        
    });
    list.innerHTML=result;
}
ShowData(array1);



//Read
function createLI(eve){
    let li=document.createElement("li");
    li.id=eve.id;
    li.classList="list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML=` <strong>${eve.name}</strong> 
                             <strong>${eve.dob}</strong>
                            <div>  
                                <i onclick="OnEdit(this)" class="fa-solid fa-pen-to-square fa-2x text-primary"></i>
                                <i onclick="OnDlt(this)"class="fa-solid fa-trash fa-2x fa-2x text-danger"></i> 
                       
                             </div>
    `
    list.append(li);
    Swal.fire({
    title:"New List  Successfully!!",
    text:"added",
    timer:2000,
    icon:"success"
  });


}


//Remove
function OnDlt(event){
let Confirmit=confirm("Are You Sure To Delete")
if(Confirmit){
let Remove_Id=event.closest("li").id;
let Index= array1.findIndex(e=>e.id===Remove_Id);
array1.splice(Index,1);
event.closest("li").remove();
    localStorage.setItem("array1",JSON.stringify(array1));
Swal.fire({
    title:"List Deleted Successfully!!",
    timer:2000,
    icon:"success"
  });

}

}

//Edit
function OnEdit(eve){
    let Edit_id=eve.closest("li").id;
    let Edobj= array1.find(e=>e.id===Edit_id);
    formInput1.value=Edobj.name,
    formInput2.value=Edobj.dob
    submitButton.classList.add("d-none");
    updateButton.classList.remove("d-none");
        localStorage.setItem("Edit_id",Edit_id);


}


//update
function onUpdate(pa){
    let Update_Id=localStorage.getItem("Edit_id");
    let index=array1.findIndex(e=>e.id===Update_Id);
    array1[index]={
        id:Update_Id,
        name:formInput1.value,
        dob:formInput2.value
   

    }
    let li=document.getElementById(Update_Id)
    li.querySelectorAll("strong")[0].innerHTML=formInput1.value
    li.querySelectorAll("strong")[1].innerHTML=formInput2.value

        submitButton.classList.remove("d-none");
    updateButton.classList.add("d-none");
      localStorage.setItem("array1",JSON.stringify(array1));
      form.reset();

    Swal.fire({
    title:"updated Successfully!!",
    timer:2000,
    icon:"success"
  });



    
}

function OnClickhandler(e){
    e.preventDefault();
    let obj={
        id:crypto.randomUUID(),
        name:formInput1.value,
        dob:formInput2.value
    }
    array1.push(obj);
    createLI(obj);
    localStorage.setItem("array1",JSON.stringify(array1));
    form.reset();
}




form.addEventListener("submit",OnClickhandler);
updateButton.addEventListener("click",onUpdate);
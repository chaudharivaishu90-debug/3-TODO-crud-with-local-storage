var cl = console.log;

const list=document.getElementById("list");
const form=document.getElementById("form");
const Study=document.getElementById("Study");
const Topic=document.getElementById("Topic");
const UpdateBtn=document.getElementById("UpdateBtn");
const SubmitBtn=document.getElementById("SubmitBtn");
const Date=document.getElementById("Date");



// let WorkArr=[{id:"1",Task:"Study",date:"01/02/2026",topic:"Angular"}];
// localStorage.setItem("WorkArr",JSON.stringify(WorkArr));
let WorkArr =JSON.parse(localStorage.getItem("WorkArr"))||[];

function ShowLi(array) {
    let result=``;
    array.forEach(ele => {
        result+=`                <li class="card mb-3 p-3" id="${ele.id}">
                    <div>
                    <strong >${ele.Task}</strong>
                    </div>
                    <span>${ele.date}</span>
                    <p>${ele.topic}</p>
                    <div class="d-flex justify-content-between">
                    <i onclick ="OnEdt(this)" class="fa-sharp fa-solid fa-pen-to-square fa-2x text-primary"></i>
                    <i onclick ="OnRemove(this)" class="fa-sharp fa-solid fa-trash fa-2x text-danger"></i>
                    </div>
                </li>
        `
    });
list.innerHTML=result;
    
}
ShowLi(WorkArr);


//create
function createLI(obj){
    let li=document.createElement("li");
    li.id=obj.id;
    li.className="card mb-3 p-3" 
    li.innerHTML=` 
    <div>
                    <strong >${obj.Task}</strong>
                    </div>
                    <span>${obj.date}</span>
                    <p>${obj.topic}</p>
                    <div class="d-flex justify-content-between">
                    <i onclick ="OnEdt(this)" class="fa-sharp fa-solid fa-pen-to-square fa-2x text-primary"></i>
                    <i onclick ="OnRemove(this)" class="fa-sharp fa-solid fa-trash fa-2x text-danger"></i>
                    </div>
                    
        `
        list.append(li);
        Swal.fire({
    title:"Craeted Successfully!!",
    timer:2000,
    icon:"success"
  });


}


//Delete
function OnRemove(p){
    let confirmation=confirm("Are u sure to delete")
    if(confirmation){
    let RemoveId=p.closest("li").id;
    let index=WorkArr.findIndex(t=>t.id===RemoveId);
    WorkArr.splice(index,1);
    p.closest("li").remove();
    localStorage.setItem("WorkArr",JSON.stringify(WorkArr));
Swal.fire({
    title:"Deleted Successfully!!",
    timer:2000,
    icon:"success"
  });


    }
    

}

//Edit
function OnEdt(el){
  let editId= el.closest("li").id;
  let editOBJ=WorkArr.find(t=>t.id===editId);
  Study.value=editOBJ.Task,
  Topic.value=editOBJ.topic,
  Date.value=editOBJ.date,
  SubmitBtn.classList.add("d-none");
    UpdateBtn.classList.remove("d-none");
  localStorage.setItem("editId",editId);


}

//update
function Onuphandler(el){
  let updateID= localStorage.getItem("editId");
  let updatedobj={
    id:updateID,
        Task:Study.value,
        topic:Topic.value,
        date:Date.value
  }
  let index=WorkArr.findIndex(e=>e.id===updateID);
  WorkArr[index]=updatedobj;
  localStorage.setItem("WorkArr",JSON.stringify(WorkArr));
  let li=document.getElementById(updateID)
  li.querySelectorAll("strong")[0].innerHTML = Study.value;
li.querySelectorAll("span")[0].innerHTML = Date.value;
li.querySelectorAll("p")[0].innerHTML = Topic.value;
SubmitBtn.classList.remove("d-none");
    UpdateBtn.classList.add("d-none");
        localStorage.removeItem("editId");
  form.reset();
Swal.fire({
    title:"updated Successfully!!",
    timer:2000,
    icon:"success"
  });


}







function Onhandler(eve){
    eve.preventDefault();
    let obj={
        id:crypto.randomUUID(),
        Task:Study.value,
        topic:Topic.value,
        date:Date.value
    }
    WorkArr.push(obj);
    localStorage.setItem("WorkArr",JSON.stringify(WorkArr));
    createLI(obj);
    form.reset();
}



form.addEventListener("submit",Onhandler);
UpdateBtn.addEventListener("click",Onuphandler);
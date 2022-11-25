console.log("welcome to our app.js")


shownotes();

let addBtn= document.getElementById("addBtn");
addBtn.addEventListener("click", function(e) {

    let addTxt= document.getElementById("addTxt");
    let addTitle=document.getElementById("addTitle")
    let notes= localStorage.getItem('notes');
    let notesobj;
    if(notes == null){
        
        notesobj=[];
    }
    else{
        notesobj = JSON.parse(notes);
    }
    let myObj={
        title: addTitle.value,
        text: addTxt.value

    }
    notesobj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    addTxt.value="";
    addTitle.value="";
    // console.log(notesobj);
    shownotes();
})
function shownotes() {
    let notes= localStorage.getItem("notes");
    let notesobj;
    if(notes == null){
        notesobj=[];
    }
    else{
        notesobj= JSON.parse(notes);
    }
    let html="";
    notesobj.forEach(function(element,index) {
        html +=`
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${index+1}. ${element.title}</h5>
                    <p class="card-text">${element.text}</p>
                    <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete</button>
                </div>
            </div>
        `
        
    });
    let notesElm= document.getElementById('notes');
        if(notesobj.length!=0){
            notesElm.innerHTML=html
        }
        else{
            notesElm.innerHTML=`Nothing to show!! you have to use "add a note" to add something in the your notes`
        }
    
}

function deleteNote(index) {
    // console.log("im deleting", index);
    let notes= localStorage.getItem("notes");
    if(notes == null){
        
        notesobj=[];
    }
    else{
        notesobj = JSON.parse(notes);
    }
    notesobj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    shownotes();
}


let search= document.getElementById("searchTxt");
// console.log(searchTxt);
search.addEventListener("input",function() {

    let inputval= search.value.toLowerCase();
    // console.log("input event fired!!",inputval);
    let noteCard=document.getElementsByClassName("noteCard");
    Array.from(noteCard).forEach(function(element) {
        let cardTxt=element.getElementsByTagName("p")[0].innerHTML;
        // console.log(cardTxt);
        if(cardTxt.includes(inputval)){
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }
        
    })
    
    
})
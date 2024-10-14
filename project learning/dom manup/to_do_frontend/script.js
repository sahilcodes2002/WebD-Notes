let count=0;
let donecount=0;

function createChild(title,about,id,func,message){
    let prnt=document.createElement('div');
    let child1=document.createElement('div');
    
    let child3=document.createElement('button');
    child1.innerHTML=title;
    child3.textContent=message;

    prnt.appendChild(child1);
    if(about!=''){
        let child2=document.createElement('div');
        child2.innerHTML=about;
        prnt.appendChild(child2);
    }

    prnt.appendChild(child3);
    prnt.appendChild(document.createElement('br'));
    prnt.appendChild(document.createElement('br'));

    prnt.setAttribute("id",id);
    child3.onclick=function(){
        func(id);
    }

    //console.log(prnt);
    return prnt;

}


function addToList(title,about){
    count++;
    title=title.trim();
    about=about.trim();
    let ele=document.getElementById('l');
    
    if(about!=''){
        ele.appendChild(createChild(title,about,`todo${count}`,markdone,"Mark as done"));
        
    }
    else{
        ele.appendChild(createChild(title,'',`todo${count}`,markdone,"Mark as done"));
        
    }
}

function markdone(idname){
    donecount++;
    let torem=document.getElementById(idname);
    //console.log(torem);
    let arr=torem.getElementsByTagName('div');
    let ele=document.getElementById('comp');
    
    if(arr.length==2){
        let title=arr[0].innerHTML;
        let about=arr[1].innerHTML;
        
        ele.appendChild(createChild(title,about,`done${donecount}`,Removee,"Delete"));
        
    }
    else{
        let title=arr[0].innerHTML;
        ele.appendChild(createChild(title,'',`done${donecount}`,Removee,"Delete"));
        
    }
    torem.remove();
}

function Removee(idname){
    let torem=document.getElementById(idname);
    torem.remove();
}

function addToDo(){
    let title=document.querySelector('#t').value;
    let about=document.querySelector('#ab').value;
    //console.log(title);
    if(title.trim()!=''){
        //console.log(title);
        addToList(title,about);
    }
    else{
        if(title.trim()==''){
            alert("write the title")
        }
    }
}
let globalId = 1;
    let todoState = [];
    let oldTodoState = [];
    var idxx=-1;
    let calls=0;


    

    function domaddition(it){
        let ele=document.getElementById("todos");
        let newtodo= document.createElement("div");
        newtodo.setAttribute("class","td");
        newtodo.setAttribute("id",`${it.id}`);

        let newtitle= document.createElement("div");
        newtitle.innerHTML=it.title;
        newtitle.setAttribute("class","title");

        let newdesc= document.createElement("div");
        newdesc.innerHTML=it.description;
        newdesc.setAttribute("class","description");

        let newbutton=document.createElement("button");
        if(it.done){
            newbutton.innerHTML="done";
        }
        else{
            newbutton.innerHTML="completed";
        }
        newbutton.setAttribute("class","donebtn");
        newbutton.setAttribute("onclick",`completed(${it.id})`);

        newtodo.appendChild(newtitle);
        newtodo.appendChild(newdesc);
        newtodo.appendChild(newbutton);

        ele.appendChild(newtodo);

    }

    function addTodoToDom(added) {
        for (let it of added){
            domaddition(it);
        }
    }

    function removeTodoFromDom(deleted) {
        for(let it of deleted){
            let ele= document.getElementById(`${it.id}`);
            if(ele){
                ele.parentNode.removeChild(ele);
            }
        }
    }

    function updateTodoInDom(updated) {
        for(let it of updated){
            let ele=document.getElementById(`${it[0].id}`);
            ele.getElementsByTagName("button")[0].innerHTML="done";
        }
    }


    function ispresent(idd){
        for(let i=0;i<todoState.length;i++){
            let it=todoState[i];
            if(it.id===idd){
                
                idxx=i;
                return true;
            }
        }
        return false;
    }
    function ispresentinold(idd){
        for(let i=0;i<oldTodoState.length;i++){
            let it=oldTodoState[i];
            if(it.id===idd){
                return true;
            }
        }
        return false;
    }

    function updateState(newTodos) {
      const added = [];
      const deleted = [];
      const updated = [];
      const td = document.getElementById("todos");
      let n1=oldTodoState.length;
      let n2=todoState.length;

      for( let i=0;i<n1;i++ ){
        
        if(ispresent(oldTodoState[i].id)){
            
            if(oldTodoState[i].done!=todoState[idxx].done){
                updated.push([oldTodoState[i],todoState[idxx].done]);
                idxx=-1;
            }
        }
        else{
            deleted.push(oldTodoState[i]);
        }
      }
      for(let j=0 ; j<n2 ;j++ ){
        if(!ispresentinold(todoState[j].id)){
            
            added.push(todoState[j]);
        }
      }
      

      addTodoToDom(added);
      removeTodoFromDom(deleted);
      updateTodoInDom(updated);
    
      //console.log(todoState);
      oldTodoState = JSON.parse(JSON.stringify(todoState));


    }


    async function updateTodoMongo(username, id, updateFields) {
        try {
          const response = await fetch('http://localhost:3000/updatetodo', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, id: id, updateFields: updateFields })
          });
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error updating todo:', error);
          return null;
        }
    }

    async function completed(id){
        const updating=await updateTodoMongo("sahil", id, {done:true});
        // for(let it of todoState){
        //     if(it.id===id){
        //         it.done=true;
        //     }
        // }
        //updateState(todoState);
        todosFromMongototodoState()
    }

    async function addTodoMongo(username, id,title,description) {
        try {
          const response = await fetch('http://localhost:3000/addtodos', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, id: id,title: title,description: description })
          });
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error adding todo:', error);
          return null;
        }
      }

      async function updateIdMongo(username, id) {
        try {
          const response = await fetch('http://localhost:3000/increaseID', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, id: id})
          });
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error updating todo:',error);
          return null;
        }
    }


    async function addTodo() {
      const title = document.getElementById("title").value;
      const description = document.getElementById("description").value;
      const adding= await addTodoMongo("sahil", globalId,title,description);
      globalId++;
      if(!adding){
        alert("problem in addtomongo");
      }
      const idupdate= await updateIdMongo("sahil", globalId);
      if(!idupdate){
        alert("id not updated");
      }
      
    //   todoState.push({
    //     title: title,
    //     description: description,
    //     id: globalId++,
    //     done:false
    //   })
      //updateState(todoState);
      todosFromMongototodoState()
    }

    async function getTodosMongo(username) {
        try {
          const response = await fetch('http://localhost:3000/gettodos', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username })
          });
          const data = await response.json();
          return data;
        } catch (error) {

          //console.error('Error fetching todos:', error);
          return null;
        }
    }
    

    



    async function todosFromMongototodoState(){
        const todoData=  await getTodosMongo("sahil");
        calls++;
        
        
        console.log(calls);
        if(!todoData){
            //alert("problem in todosFromMongototodoState");
        }
        else{
            todoState=todoData.todos;
            updateState(todoState);
        }
    }


    async function getidFromMongodb(username){
        try{
            const response= await fetch("http://localhost:3000/makeID",{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ username: username })
                });
                const data = await response.json();
                return data;
        }
        catch{
            return null;
        }
    }
        
    async function getid(){
        id = await getidFromMongodb("sahil");
        if(!id){
            alert("error in getting id");
        }
        else{
            //console.log(id.id);
            return id.id;
        }
    }


    //getid();

    document.addEventListener("DOMContentLoaded",async function(){
        globalId= await getid();
        console.log(globalId);
        todosFromMongototodoState()
    })



    //setInterval(todosFromMongototodoState,1000);


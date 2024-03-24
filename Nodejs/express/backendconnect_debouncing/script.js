function f1() { 
    const x = parseFloat(document.querySelector('#num1').value); 
    const y = parseFloat(document.querySelector('#num2').value); 
    const sum = x + y; 
    console.log(sum); 
    document.querySelector('#ans').innerHTML = sum; 
    let ele=document.createElement('p'); 
    ele.innerHTML="hi there !"+sum.toString(); 
    const oldele=document.getElementsByTagName('body')[0]; 
    oldele.appendChild(ele); 
}

function fetchsum(a,b){
    return new Promise(async function(resolve,reject){
        const res=await fetch("http://localhost:3003/add?a="+a+"&b="+b);
        const final = await res.text();
        console.log(final);
        resolve(final);
    })
}

function fetchIntrest(principle,rate,time){
    return new Promise(async function(resolve,reject){
        const res = await fetch("http://localhost:3003/intrest?p="+principle+"&r="+rate+"&t="+time);
        const ans= await res.json();
        console.log(ans);
        resolve(ans);
    })
}

function f7(a){
    document.getElementsByTagName("h1")[0].innerHTML=a.toString();
}

async function f3(a,b){
    const ans=await fetchsum(a,b);
    f7(ans);
}

function f2(){
    let val1= document.getElementById("num1").value;
    let val2= document.getElementById("num2").value;

    if(val1.trim()!='' && val2.trim()!=''){
        f3(val1,val2);
    }
}

async function f10(){
    let p=document.getElementById("p").value;
    let r=document.getElementById("r").value;
    let t=document.getElementById("t").value;
    if(p.trim()!='' && r.trim()!='' && t.trim()!= ''){
        const ans= await fetchIntrest(p,r,t);
        document.getElementById('hh').innerHTML="INTREST : "+ans["int"].toString()+"<br/>" +"AMOUNT : "+ans["am"].toString();
    }
}


var time;

function debouncedf2(){
    clearInterval(time);
    time=setTimeout(f2,260);
}

var time1;

function debouncedf10(){
    clearTimeout(time1);
    time1=setTimeout(f10,250);
}

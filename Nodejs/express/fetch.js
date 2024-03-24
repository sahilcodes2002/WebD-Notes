async function getData(){
    const response = await fetch("https://fakerapi.it/api/v1/persons")
    const finalData= await response.json()
    console.log(finalData);
    document.querySelector('#printt').innerHTML=JSON.stringify(finalData);
    document.querySelector('#printt2').innerHTML=finalData.code;
}


document.addEventListener('DOMContentLoaded',function(){
    getData();
})
  

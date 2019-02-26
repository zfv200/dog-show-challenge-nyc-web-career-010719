document.addEventListener('DOMContentLoaded', () => {
  let apiUrl = 'http://localhost:3000/dogs'
  let dogs = []

  function fetchDogs(){
    fetch(apiUrl)
    .then(r=>r.json())
    .then(json=>{
      dogs = json
      appendDogsToPage(json)
    })
  }

  function appendDogsToPage(dogs){
    //what do I want to append it to?
    let table = document.querySelector('#table-body')
    dogs.forEach(dog=>{
      table.innerHTML += dogHTML(dog)
    })
  }

  function makeMasterEventListener(){
    document.addEventListener('click', (e)=>{
      if (e.target.innerText === "Edit"){
        doThisWhenIClickEdit(e.target)
      }
      if (e.target.id === "I'm-a-submit-button"){
        e.preventDefault()
        doThisWhenIClickSubmit(e.target)
      }
    })
  }

  function doThisWhenIClickSubmit(target){
    console.log(target);
    let form = grabForm()
    let name = form.children[0].value
    let breed = form.children[1].value
    let sex = form.children[2].value
    patchRequestForDogs()
  }

  function patchRequestForDogs(dogObj){
    console.log(dogObj);
  }

  function grabForm(){
    return document.querySelector('#dog-form')
  }

  function doThisWhenIClickEdit(target){
    dog = dogs.find(dog=>dog.id == target.id)
    Array.prototype.slice.call(document.querySelector('#dog-form').children).slice(0, 3).forEach(el=>{
      el.value = dog[el.name]
    })
  }

  function dogHTML(dog){
    return `
    <tr><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button id=${dog.id}>Edit</button></td></tr>
    `
  }

  makeMasterEventListener()
  fetchDogs()

})

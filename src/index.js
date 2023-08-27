const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let divCollect = document.querySelector('#toy-collection')

function getToys() {
  return fetch('http://localhost:3000/toys')
    .then(res => res.json())
};

function postToy(toy) {
  fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json",
      },
      body: JSON.stringify({
        "name": toy.name.value,
        "image": toy.image.value,
        "likes": 0

      })
    })
    .then(res => res.json())
    .then((objToy) => {
      let newToy = renderToys(objToy)
      divCollect.append(newToy)
    })
}

function likes(e) {
  e.preventDefault()
  let more = parseInt(e.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
      body: JSON.stringify({
        "likes": more
      })
    })
    .then(res => res.json())
    .then((likeObj => {
      e.target.previousElementSibling.innerText = `${more} likes`;
    }))
}

function renderToys(toy) {
  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  let img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar')

  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  let btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerText = "like"
  btn.addEventListener('click', (e) => {
    console.log(e.target.dataset);
    likes(e)
  })

  let divCard = document.createElement('div')
  divCard.setAttribute('class', 'card')
  divCard.append(h2, img, p, btn)
  divCollect.append(divCard)
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', e => {
      e.preventDefault()
      postToy(e.target)
    })
  } else {
    toyForm.style.display = 'none'
  }
})
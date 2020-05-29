let booksLibrary = [];

function render(books) {
  if (Array.isArray(books)) {
    for (i = 0; i < books.length; i++) {
      const cardDeck = document.querySelector(".row-cols-3")
      cardDeck.innerHTML += `<div class="card book-${i} mt-3 mb-3" data-index="${i}">
      <div class="card-header text-right"></div>
          <div class="card-body">
            <h5 class="card-title"></h5>
            <h6 class="card-text text-muted"></h6>
          </div>
          <div class="card-footer bg-transparent d-flex"><a href="#" class="remove-button">Remove</a></div>
      </div>`
      const cardTitle = document.querySelector(`div.book-${i} h5`)
      cardTitle.innerHTML = `${books[i].title}`
      let subtitle = document.querySelector(`div.book-${i} h6`)
      subtitle.innerHTML = `${books[i].author}, ${books[i].pages} pages`
      if (books[i].read == 'unread') {
        document.querySelector(`.book-${i}`).firstElementChild.innerHTML += '<span class="badge badge-warning">Unread</span>'
        document.querySelector(`.book-${i}`).lastElementChild.innerHTML += '<div class="ml-auto"><a href="#" class="read-button">Mark as Read</a></div>'
      } else if (books[i].read == 'read') {
          document.querySelector(`.book-${i}`).firstElementChild.innerHTML += '<span class="badge badge-success">Read</span>'
      }
    }
  } else if (typeof books == 'object') {
    let i = booksLibrary.length
    const container = document.querySelector(".row-cols-3")
    container.innerHTML += `<div class="card book-${i} mt-3 mb-3">
    <div class="card-header text-right"></div>
        <div class="card-body">
          <h5 class="card-title"></h5>
          <h6 class="card-text text-muted"></h6>
        </div>
        <div class="card-footer bg-transparent d-flex"><a href="#" class="remove-button">Remove</a></div>
    </div>`
    const cardTitle = document.querySelector(`div.book-${i} h5`)
    cardTitle.innerHTML = `${books.title}`
    let subtitle = document.querySelector(`div.book-${i} h6`)
    subtitle.innerHTML = `${books.author}, ${books.pages} pages`
    if (books.read == 'unread') {
      document.querySelector(`.book-${i}`).firstElementChild.innerHTML += '<span class="badge badge-warning">Unread</span>'
      document.querySelector(`.book-${i}`).lastElementChild.innerHTML += '<div class="ml-auto"><a href="#" class="read-button">Mark as Read</a></div>'
    } else if (books.read == 'read') {
        document.querySelector(`.book-${i}`).firstElementChild.innerHTML += '<span class="badge badge-success">Read</span>'
    }
  }
}

document.querySelector('button').addEventListener('click', () => {
  let inputTitle = document.getElementById("inputTitle")
  let inputAuthor = document.getElementById("inputAuthor")
  let inputPages = document.getElementById("inputPages")
  let inputRead = document.getElementById("select")
  if (inputTitle.value == '' || inputAuthor.value == '' || inputPages.value == '' || inputRead.value == 'undefined') {
    if (inputRead.value == 'undefined') {
      window.alert('Please show whether you have read the book or not by choosing from the dropdown menu')
    } else {window.alert("Please fill out all fields")}
  } else if (isNaN(inputPages.value)) {
    window.alert('Pages can only contain numbers')
  } else {
    let newBook = new Book(inputTitle.value, inputAuthor.value, inputPages.value, inputRead.value)
    newBook.addToLibrary()
    render(newBook)
  }
})

document.querySelector(".container").addEventListener('click', () => {
  if (event.target.className == 'remove-button') {
    event.target.parentNode.parentNode.remove()
  } else if (event.target.className == 'read-button') {
    const arrIndex = event.target.parentNode.parentNode.parentNode.dataset.index
    booksLibrary[arrIndex].markAsRead()
    if (booksLibrary[arrIndex].read == 'read') {
      event.target.parentNode.parentNode.parentNode.firstElementChild.innerHTML = '<span class="badge badge-success">Read</span>'
      event.target.parentNode.remove()
    }
  }
})

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.addToLibrary = function() {
    booksLibrary.push(this)
  }
  this.markAsRead = function() {
    this.read = 'read'
  }
}

const book1 = new Book('Harry Potter', 'JK Rowling', 987, 'read')
const book2 = new Book('Harry Pooper', 'LMFAO Rowling', 987, 'unread')
const book3 = new Book('Harry Pooper', 'LMFAO Rowling', 987, 'read')
const book4 = new Book('Harry Pooper', 'LMFAO Rowling', 987, 'read')
const book5 = new Book('Harry Pooper', 'LMFAO Rowling', 987, 'unread')
const book6 = new Book('Harry Pooper', 'LMFAO Rowling', 987, 'read')
const book7 = new Book('Harry Pooper', 'LMFAO Rowling', 987, 'unread')
const book8 = new Book('Harry Pooper', 'LMFAO Rowling', 987, 'unread')
const book9 = new Book('Harry Pooper9', 'LMFAO Rowling9', 999, 'read')

book1.addToLibrary()
book2.addToLibrary()
book3.addToLibrary()
book4.addToLibrary()
book5.addToLibrary()
book6.addToLibrary()
book7.addToLibrary()
book8.addToLibrary()
book9.addToLibrary()

render(booksLibrary)
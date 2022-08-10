const theHobbit = new Book(
  "The Hobbit",
  "J.R.R. Tolkien",
  "295",
  "not read yet"
);

const markusGiant = new Book("Markus Giant", "Bogdan Aiuriios", "1442", "read");

const goGame = new Book("Go Game", "Iuriona Jixiun", "44", "read");

let myLibrary = [theHobbit, markusGiant, goGame];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${title} by ${author}, ${pages} pages, ${read}`;
  };
}

function addBookToLibrary() {
  let title = prompt("title");
  let author = prompt("author");
  let pages = Number(prompt("pages"));
  let read = prompt("read yes/ no");

  let newBook = new Book(`${title}`, `${author}`, `${pages}`, `${read}`);
  myLibrary.push(newBook);
}

function displayBooks() {
  const libraryContainer = document.querySelector(".library-container");

  myLibrary.forEach((book) => {
    const placedBook = document.createElement("div");
    placedBook.className = "book";
    placedBook.id = book.title;
    libraryContainer.appendChild(placedBook);
  });
}

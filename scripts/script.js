const theHobbit = new Book(
  "The Hobbit",
  "J.R.R. Tolkien",
  "295",
  "not read yet"
);

const markusGiant = new Book("Markus Giant", "Bogdan Aiuriios", "1442", "read");

const goGame = new Book("Go Game", "Iuriona Jixiun", "44", "read");

const goGame2 = new Book("Go Game 2", "Iuriona Jixiun", "44", "read");

const goGame3 = new Book("Go Game 3", "Iuriona Jixiun", "44", "read");

let myLibrary = [theHobbit, markusGiant, goGame, goGame2, goGame3];

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

    const placedBookTitle = document.createElement("div");
    placedBookTitle.className = "title";
    placedBookTitle.textContent = `${book.title}`;

    const placedBookAuthor = document.createElement("div");
    placedBookAuthor.className = "author";
    placedBookAuthor.textContent = `Author: ${book.author}`;

    const placedBookPages = document.createElement("div");
    placedBookPages.className = "pages";
    placedBookPages.textContent = `Pages: ${book.pages}`;

    const placedBookRead = document.createElement("div");
    placedBookRead.className = "read-status";
    placedBookRead.textContent = `${book.read}`;

    placedBook.className = "book";
    placedBook.id = book.title;
    placedBook.appendChild(placedBookTitle);
    placedBook.appendChild(placedBookAuthor);
    placedBook.appendChild(placedBookPages);
    placedBook.appendChild(placedBookRead);
    libraryContainer.appendChild(placedBook);
  });
}

displayBooks();

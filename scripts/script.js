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
}

// TODO: make it a modal
// Dynamically create a form and ask user for info about the book
function startBookForm() {
  const bookForm = document.createElement("form");
  bookForm.setAttribute("method", "post");
  bookForm.setAttribute("action", "#");
  bookForm.id = "book-form";

  const titleLabel = document.createElement("label");
  titleLabel.setAttribute("for", "book_title");
  titleLabel.textContent = "TITLE";

  const bookTitle = document.createElement("input");
  bookTitle.setAttribute("type", "text");
  bookTitle.setAttribute("name", "book_title");
  bookTitle.id = "book_title";
  bookTitle.setAttribute("required", "");

  bookForm.appendChild(titleLabel);
  bookForm.appendChild(bookTitle);

  const authorLabel = document.createElement("label");
  authorLabel.setAttribute("for", "book_author");
  authorLabel.textContent = "AUTHOR";

  const bookAuthor = document.createElement("input");
  bookAuthor.setAttribute("type", "text");
  bookAuthor.setAttribute("name", "book_author");
  bookAuthor.id = "book_author";
  bookAuthor.setAttribute("required", "");

  bookForm.appendChild(authorLabel);
  bookForm.appendChild(bookAuthor);

  const pagesLabel = document.createElement("label");
  pagesLabel.setAttribute("for", "book_pages");
  pagesLabel.textContent = "PAGES";

  const bookPages = document.createElement("input");
  bookPages.setAttribute("type", "number");
  bookPages.setAttribute("name", "book_pages");
  bookPages.setAttribute("min", "1");
  bookPages.id = "book_pages";
  bookPages.setAttribute("required", "");

  bookForm.appendChild(pagesLabel);
  bookForm.appendChild(bookPages);

  const readLabel = document.createElement("label");
  readLabel.setAttribute("for", "book_read");
  readLabel.textContent = "READ";

  const bookRead = document.createElement("input");
  bookRead.setAttribute("type", "checkbox");
  bookRead.setAttribute("name", "book_read");
  bookRead.id = "book_read";
  bookRead.setAttribute("required", "");

  bookForm.appendChild(readLabel);
  bookForm.appendChild(bookRead);

  const submitButton = document.createElement("button");
  submitButton.textContent = "SUBMIT";
  submitButton.setAttribute("type", "button");
  submitButton.setAttribute("form", "book-form");
  submitButton.setAttribute("value", "Submit");
  submitButton.className = "button";
  submitButton.id = "book-submit";

  bookForm.appendChild(submitButton);

  const libraryContainer = document.querySelector(".wrapper");
  libraryContainer.appendChild(bookForm);

  // Pass form info to addBookToLibrary
  submitButton.addEventListener("click", () => {
    if (bookRead.checked) {
      bookRead.value = "read";
    } else {
      bookRead.value = "not read yet";
    }

    if (!checkDuplicate(bookTitle.value, bookAuthor.value)) {
      addBookToLibrary(
        bookTitle.value,
        bookAuthor.value,
        bookPages.value,
        bookRead.value
      );
    }

    libraryContainer.removeChild(bookForm);
  });
}

// Push the book into myLibrary
function addBookToLibrary(title, author, pages, read) {
  let newBook = new Book(`${title}`, `${author}`, `${pages}`, `${read}`);
  myLibrary.push(newBook);
  displayBooks();
}

// Display book information in the HTML
function displayBooks() {
  const libraryContainer = document.querySelector(".library-container");

  myLibrary.forEach((book) => {
    // Check if the book already exists in the HTML
    // If it doesn't exist, add it
    if (!document.getElementById(`${book.title} by ${book.author}`)) {
      const placedBook = document.createElement("div");

      const placedBookLocation = myLibrary.indexOf(book);
      placedBook.dataset.location = placedBookLocation;

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

      const removeButton = document.createElement("button");
      removeButton.textContent = "REMOVE";
      removeButton.setAttribute("type", "button");
      removeButton.className = "button book-remove";

      placedBook.className = "book";
      placedBook.id = `${book.title} by ${book.author}`;
      placedBook.appendChild(placedBookTitle);
      placedBook.appendChild(placedBookAuthor);
      placedBook.appendChild(placedBookPages);
      placedBook.appendChild(placedBookRead);
      placedBook.appendChild(removeButton);
      libraryContainer.appendChild(placedBook);
    }
  });
  findRemoveButtonLocation();
}

function findRemoveButtonLocation() {
  // Send book location from myLibrary to removeBook() if remove button is clicked
  document.onclick = (e) => {
    if (e.target.className.includes("book-remove")) {
      removeBook(e.target.parentNode.dataset.location);
    }
  };
}

// Remove book from library and from HTML
function removeBook(arrayLocation) {
  const bookLocationFormatted =
    "[data-location=" + "'" + arrayLocation + "'" + "]";
  const bookElement = document.querySelector(bookLocationFormatted);

  myLibrary.splice(arrayLocation, 1);
  bookElement.parentNode.removeChild(bookElement);

  updateBookLocation();
}

// Update data-location of all books
function updateBookLocation() {
  myLibrary.forEach((book) => {
    const placedBook = document.getElementById(
      `${book.title} by ${book.author}`
    );
    const placedBookLocation = myLibrary.indexOf(book);

    placedBook.dataset.location = placedBookLocation;
  });
}

// Check if book already exists in myLibrary
function checkDuplicate(title, author) {
  let checkTitle = myLibrary.some(function (book) {
    return book.title === title.toLowerCase();
  });

  let checkAuthor = myLibrary.some(function (book) {
    return book.author === author.toLowerCase();
  });

  if (checkTitle && checkAuthor) {
    return true;
  } else {
    return false;
  }
}

displayBooks();

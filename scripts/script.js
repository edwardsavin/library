const bookTheHobbit = new Book(
  "The Hobbit",
  "J.R.R. Tolkien",
  "295",
  "not read yet"
);

const bookFoundation = new Book("Foundation", "Isaac Asimov", "255", "read");

const bookHarryPotter1 = new Book(
  "Harry Potter and the Philosopher's Stone",
  "J. K. Rowling",
  "223",
  "read"
);

const bookGreatGatsby = new Book(
  "The Great Gatsby",
  "F. Scott Fitzgerald",
  "208",
  "read"
);

const bookGoGame3 = new Book("Brave New World", "Aldous Huxley", "311", "read");

let myLibrary = [
  bookTheHobbit,
  bookFoundation,
  bookHarryPotter1,
  bookGreatGatsby,
  bookGoGame3,
];

// Modal
const modal = document.querySelector(".modal");
const trigger = document.querySelector(".modal-trigger");
const closeButton = document.querySelector(".modal-close");
const modalContent = document.querySelector(".modal-content");

function toggleModal() {
  modal.classList.toggle("modal-show");
}

function windowOnClick(event) {
  if (event.target === modal) {
    modalContent.removeChild(modalContent.lastChild);
    toggleModal();
  } else if (event.target === closeButton) {
    modalContent.removeChild(modalContent.lastChild);
  }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

document.addEventListener("keypress", function (e) {
  if (modal.className.includes("modal-show")) {
    if (e.key === "Enter") {
      document.getElementById("book-submit").click();
    }
  }
});

// Book constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Dynamically create a form and ask user for info about the book
function startBookForm() {
  modal.appendChild(modalContent);

  const bookForm = modalContent.appendChild(document.createElement("form"));
  bookForm.setAttribute("method", "post");
  bookForm.setAttribute("action", "#");
  bookForm.id = "book-form";

  const titleLabel = modalContent.appendChild(document.createElement("label"));
  titleLabel.setAttribute("for", "book_title");
  titleLabel.textContent = "Title";

  const bookTitle = modalContent.appendChild(document.createElement("input"));
  bookTitle.setAttribute("type", "text");
  bookTitle.setAttribute("name", "book_title");
  bookTitle.id = "book_title";
  bookTitle.setAttribute("required", "");

  bookForm.appendChild(titleLabel);
  bookForm.appendChild(bookTitle);

  const authorLabel = modalContent.appendChild(document.createElement("label"));
  authorLabel.setAttribute("for", "book_author");
  authorLabel.textContent = "Author";

  const bookAuthor = modalContent.appendChild(document.createElement("input"));
  bookAuthor.setAttribute("type", "text");
  bookAuthor.setAttribute("name", "book_author");
  bookAuthor.id = "book_author";
  bookAuthor.setAttribute("required", "");

  bookForm.appendChild(authorLabel);
  bookForm.appendChild(bookAuthor);

  const pagesLabel = modalContent.appendChild(document.createElement("label"));
  pagesLabel.setAttribute("for", "book_pages");
  pagesLabel.textContent = "Pages";

  const bookPages = modalContent.appendChild(document.createElement("input"));
  bookPages.setAttribute("type", "number");
  bookPages.setAttribute("name", "book_pages");
  bookPages.setAttribute("min", "1");
  bookPages.id = "book_pages";

  bookForm.appendChild(pagesLabel);
  bookForm.appendChild(bookPages);

  const readContainer = modalContent.appendChild(document.createElement("div"));
  readContainer.className = "checkbox-container";

  bookForm.appendChild(readContainer);

  const readLabel = readContainer.appendChild(document.createElement("label"));
  readLabel.setAttribute("for", "book_read");
  readLabel.textContent = "Read";

  const bookRead = readContainer.appendChild(document.createElement("input"));
  bookRead.setAttribute("type", "checkbox");
  bookRead.setAttribute("name", "book_read");
  bookRead.id = "book_read";

  readContainer.appendChild(readLabel);
  readContainer.appendChild(bookRead);

  const submitButton = modalContent.appendChild(
    document.createElement("button")
  );
  submitButton.textContent = "SUBMIT";
  submitButton.setAttribute("type", "button");
  submitButton.setAttribute("form", "book-form");
  submitButton.setAttribute("value", "Submit");
  submitButton.className = "button";
  submitButton.id = "book-submit";

  bookForm.appendChild(submitButton);

  const libraryContainer = document.querySelector(".wrapper");
  libraryContainer.appendChild(modal);

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

    modalContent.removeChild(modalContent.lastChild);
    toggleModal();
  });
}

// Push the book into myLibrary
function addBookToLibrary(title, author, pages, read) {
  if (title !== "" && author !== "") {
    let newBook = new Book(`${title}`, `${author}`, `${pages}`, `${read}`);
    myLibrary.push(newBook);
    displayBooks();
  }
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

      const placedBookReadStatus = document.createElement("div");
      placedBookReadStatus.textContent = "Read status:";

      const placedBookSwitch = document.createElement("label");
      placedBookSwitch.className = "switch";

      const placedBookRead = placedBookSwitch.appendChild(
        document.createElement("input")
      );
      placedBookRead.setAttribute("type", "checkbox");
      if (book.read === "read") {
        placedBookRead.className = "read-status read";
        placedBookRead.checked = true;
      } else {
        placedBookRead.className = "read-status not-read";
      }

      const placedBookSlider = placedBookSwitch.appendChild(
        document.createElement("span")
      );
      placedBookSlider.className = "slider";

      const removeButton = document.createElement("button");
      removeButton.setAttribute("type", "button");
      removeButton.className = "button book-remove";

      const removeButtonText = removeButton.appendChild(
        document.createElement("span")
      );
      removeButtonText.textContent = "REMOVE";
      removeButtonText.className = "text";

      const removeButtonIcon = removeButton.appendChild(
        document.createElement("span")
      );
      removeButtonIcon.className = "icon";

      const removeButtonIconSvg = removeButtonIcon.appendChild(
        document.createElementNS("http://www.w3.org/2000/svg", "svg")
      );
      removeButtonIconSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      removeButtonIconSvg.setAttribute("width", "24");
      removeButtonIconSvg.setAttribute("height", "24");
      removeButtonIconSvg.setAttribute("viewBox", "0 0 24 24");

      const removeButtonIconSvgPath = removeButtonIconSvg.appendChild(
        document.createElementNS("http://www.w3.org/2000/svg", "path")
      );
      removeButtonIconSvgPath.setAttributeNS(
        null,
        "d",
        "M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"
      );

      placedBook.className = "book";
      placedBook.id = `${book.title} by ${book.author}`;
      placedBook.appendChild(placedBookTitle);
      placedBook.appendChild(placedBookAuthor);
      placedBook.appendChild(placedBookPages);
      placedBook.appendChild(placedBookReadStatus);
      placedBook.appendChild(placedBookSwitch);
      placedBook.appendChild(removeButton);
      libraryContainer.appendChild(placedBook);
    }
  });
  findButtons();
}

// Check if any button inside HTML book element is clicked
function findButtons() {
  // Send book location from myLibrary to removeBook() if remove button is clicked
  document.onclick = (e) => {
    // Path
    if (
      e.target.parentNode.parentNode.parentNode.className.includes(
        "book-remove"
      )
    ) {
      removeBook(
        e.target.parentNode.parentNode.parentNode.parentNode.dataset.location
      );
    }

    // Svg
    else if (e.target.parentNode.parentNode.className.includes("book-remove")) {
      removeBook(e.target.parentNode.parentNode.parentNode.dataset.location);
    }

    // Icon or text
    else if (e.target.parentNode.className.includes("book-remove")) {
      removeBook(e.target.parentNode.parentNode.dataset.location);
    }

    // Main button
    else if (e.target.className.includes("book-remove")) {
      removeBook(e.target.parentNode.dataset.location);
    }

    // Send book location from myLibrary to changeReadStatus() if read button is clicked
    else if (e.target.className.includes("read-status")) {
      changeReadStatus(e.target.parentNode.parentNode.dataset.location);
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

function changeReadStatus(arrayLocation) {
  const bookLocationFormatted =
    "[data-location=" + "'" + arrayLocation + "'" + "]";
  const bookElement = document.querySelector(bookLocationFormatted);
  const bookReadButton = bookElement.querySelector(".read-status");

  if (bookReadButton.classList.contains("read")) {
    bookReadButton.className = "read-status not-read";
    myLibrary[arrayLocation].read = "not read yet";
  } else {
    bookReadButton.className = "read-status read";
    myLibrary[arrayLocation].read = "read";
  }
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
    return book.title.toLowerCase() === title.toLowerCase();
  });

  let checkAuthor = myLibrary.some(function (book) {
    return book.author.toLowerCase() === author.toLowerCase();
  });

  if (checkTitle && checkAuthor) {
    return true;
  } else {
    return false;
  }
}

displayBooks();

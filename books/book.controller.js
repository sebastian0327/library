const { createBookAction } = require("./createBook.action");
const { getBook, getBooks } = require("./readBook.action");
const { softDeleteBook } = require("./deleteBook.action");
const { getUser } = require("../users/readUser.action");
const { updateBook } = require("./updateBook.action");  
const { tokenVerification } = require("../utils/auth");

async function createBook(req) {
  const { name, genre, author, publicationYear, publisher } = req.body;
  const user = await getUser(tokenVerification(req).userId, "id");

  if (!name || !genre || !author || !publicationYear || !publisher) {
    return { value: { error: "Incomplete data" }, code: 400 };
  }

  if (!user.createLibraryAllowed) {
    return {
      value: { error: "You are not authorized to create books" },
      code: 401,
    };
  }

  const newUser = await createBookAction(req.body);
  return { value: { message: "Book created successfully" }, code: 200 };
}

async function getBookById(req) {
  const bookId = req.query.id;
  if (!bookId) {
    return { value: { error: "No book id provided" }, code: 400 };
  }

  const bookData = await getBook(bookId);

  if (!bookData) {
    return { value: { error: "Book Id does not exist" }, code: 404 };
  }

  return { value: { bookData: bookData }, code: 200 };
}
async function getBooksListByFilter(req) {
  const { name, genre, publicationYear, publisher, author } = req.query;

  if (!name && !genre && !publicationYear && !publisher && !author) {
    return { value: { error: "No data provided for modification" }, code: 400 };
  }

  const filter = {};
  const keysToInclude = [
    "name",
    "genre",
    "publicationYear",
    "publisher",
    "author",
  ];
  keysToInclude.forEach((key) => {
    if (req.query.hasOwnProperty(key)) {
      filter[key] = req.query[key];
    }
  });

  const books = await getBooks(filter);
  if (!books) {
    return {
      value: { message: "There are no books with this filter" },
      code: 200,
    };
  } else {
    return { value: { booksData: books }, code: 200 };
  }
}

async function updateBookData(req) {
  const { id, name, genre, publicationYear, publisher, author } = req.body;
  const BookBody = { name, genre, publicationYear, publisher, author };
  const user = await getUser(tokenVerification(req).userId, "id");
  if (!id) {
    return { value: { error: "No book id provided for modification" }, code: 400 };
  }

  if (!name && !genre && !publicationYear && !publisher && !author) {
    return { value: { error: "No data provided for modification" }, code: 400 };
  }

  const bookData = await getBook(id);

  if (!bookData) {
    return { value: { error: "Book Id does not exist" }, code: 404 };
  }

  if (!user.updateLibraryAllowed) {
    return {value: { error: "You are not authorized to modify books" },code: 401};
  }
  await updateBook(id, BookBody);
  return { value: { message: "Book updated successfully" }, code: 200 };
}

async function deleteBook(req) {
  const bookId = req.query.id;
  const user = await getUser(tokenVerification(req).userId, "id");

  if (!bookId) {
    return {
      value: { error: "No book id provided for delete" },
      code: 400,
    };
  }

  const bookData = await getBook(bookId);

  if (!bookData) {
    return { value: { error: "Book Id does not exist" }, code: 404 };
  }

  if (!user.deleteLibraryAllowed) {
    return {
      value: { error: "You are not authorized to delete books" },
      code: 401,
    };
  }

  await softDeleteBook(bookId);
  return { value: { message: "Book deleted successfully" }, code: 200 };
}

module.exports = {
  createBook,
  getBookById,
  getBooksListByFilter,
  deleteBook,
  updateBookData,
};

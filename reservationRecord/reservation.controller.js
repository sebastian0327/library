const { createReservation } = require("./createReservation.action");
const { getBook } = require("../books/readBook.action");
const { updateBook } = require("../books/updateBook.action");
const { updateReservation } = require("./updateReservation.action");
const { getReservation } = require("./readReservation.action");
const { tokenVerification } = require("../utils/auth");
const { getUser } = require("../users/readUser.action");

async function createNewReservation(req) {
  const { bookId, endDate } = req.body;
  const reservationData = { bookId, endDate };
  const user = await getUser(tokenVerification(req).userId, "id");

  if (!user) {
    return { value: { error: "User token not found" }, code: 404 };
  }

  if (!bookId) {
    return { value: { error: "Missing book id" }, code: 400 };
  }

  if (endDate) {
    if (!(endDate instanceof Date)) {
      return { value: { error: "Invalid end date" }, code: 400 };
    }
    if (endDate < Date.now()) {
      return { value: { error: "End date cannot be in the past" }, code: 400 };
    }
  }

  const booksData = await getBook(bookId);
  if (!booksData) {
    return { value: { error: "Invalid book id list" }, code: 404 };
  }

  if (!booksData.available) {
    return { value: { error: "Book not available" }, code: 409 };
  }

  reservationData.userId = user.id;
  const newRe = await createReservation(reservationData);
  await updateBook(bookId, { available: false });
  return { value: { message: "reservation created successfully" }, code: 200 };
}

async function closeReservation(req) {

  const { bookId } = req.body;
  const user = await getUser(tokenVerification(req).userId, "id");

  if (!bookId) {
    return { value: { error: "Missing book id" }, code: 400 };
  }

  const booksData = await getBook(bookId);
  if (!booksData) {
    return { value: { error: "Invalid book id " }, code: 404 };
  }

  if (booksData.available) {
    return { value: { error: "Book has not been loaned" }, code: 409 };
  }

  const returnConsReserv = await getReservation({bookId: bookId, userId: user.id, status: "pending", });
  const returnReservationData = returnConsReserv[0];
  console.log(returnReservationData);
  if (!returnReservationData) {
    return { value: { error: "Reservation not found" }, code: 404 };
  }

  returnReservationData.status = "closed";
  returnReservationData.endDate = Date.now();

  await updateBook(bookId, { available: true });
  await updateReservation(returnReservationData.id, returnReservationData);
  return { value: { message: "Book returned successfully" }, code: 200 };
}

async function getReservationRecordUser(req, param) {
    const paramId = req.query.id;

    if (!paramId){
        return { value: { error: "No " + param + " provided" }, code: 400 }
    }

    if(param==="userId"){
     reservs = await getReservation({userId: paramId})
    }else{
     reservs = await getReservation({bookId: paramId})
    }
    
    return { value: {reservationData: reservs}, code: 200 }

    
}

module.exports = { createNewReservation, closeReservation, getReservationRecordUser };

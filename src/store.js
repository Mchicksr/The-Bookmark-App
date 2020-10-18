import api from './api'
import bookmark from'./bookmark'

const items = [];
let error = null;
let adding = false;
// const showRating = 1;

// search for a bookmark
const newFilter = function(val) {
  this.filter =val;
}
const findById = function (id) {
  return this.items.find(currentItem => currentItem.id === id);
};

// add a bookmark
const addUrl = function (newurl) {
  try {
    this.items.push(api.create(newurl));
  } catch (error) {
    console.log(error,'no')
  }
};

const toggleAddNewBookmark = function () {
  this.adding = !this.adding;
}

//Delete bookmark on page
// const findAndDelete = function (id) {
//   this.items = this.items.filter(currenturls => currenturls.id !== id);
  
// };

const findAndDelete = function (id) {
  bookmark.bookmarks = bookmark.bookmarks.filter(currenturls => currenturls.id !== id);
  
};

const setError = function (error){
  this.error = error;
};

// const findAndExpand = function(id) {
//   let bookmark = this.findById(id);
//   bookmark.expand = true;
//   bookmark.filtered= true;
// }

export default {
  newFilter,
  findAndDelete,
  items,
  error,
  adding,
  // showRating,
  toggleAddNewBookmark,
  addUrl,
  findById,
  // findAndExpand,
  setError
};
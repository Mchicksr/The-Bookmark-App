import api from './api'

const items = [];
let error = null;
let adding = false;
const showRating = 1;

// search for a bookmark
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
const findAndDelete = function (id) {
  this.items = this.items.filter(currenturls => currenturls.id !== id);
  
};

const setError = function (error){
  this.error = error;
};

export default {
  findAndDelete,
  items,
  error,
  adding,
  showRating,
  toggleAddNewBookmark,
  addUrl,
  findById,
  setError
};
import $ from 'jquery';
import store from './store';
import api from './api';
import data from './data';


window.$ = $;
let sessionStorage = window.sessionStorage

function updateSessionStorage(bookmarks) {
  sessionStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/////////////////
// GenerateHTML//
/////////////////
$('section').prepend(`
  <header>
    <h1>Le Bookmark</h1>
  </header>
  <button id="clickMe">Add Bookmark</button>

  <select name ='rating' id="filter" size='1'>
  <option value= "1"  >All stars</option> 
  <option value= "2" >2 stars</option>  
  <option value= "3" >3 stars</option>
  <option value= "4" >4 stars</option> 
  <option value= "5" >5 stars</option>
</select>
`)


const generateMain = function () {
  filterByRating()


  return `
    <div id="myDIV">
    <nav>
        <div class="container">
          <form>
              <label for='url'>Create Bookmark Here!</label><br>
              <input type='text' id='title' name='title' placeholder="title" required><br>
              <input type='text' id='url' name='url' placeholder="url" required><br>
              <textarea id='description' name='description' placeholder="description"></textarea><br>
              <button class='new' type = 'submit' value="submit" >New</button> 
    <select name ='star' size='1'>
    <option value= "5 stars" >5 stars</option>
    <option value= "4 stars" >4 stars</option> 
    <option value= "3 stars" >3 stars</option>
    <option value= "2 stars" >2 stars</option>  
    <option value= "1 star"  >1 star</option> 
  </select>
          </form>
         
        </div>
    </nav>
    </div>
  `
};

//generate a bookmark
const generateBookmark = function (item) {
  //console.log('generate bookmark called...')
  return `
 
 
  <article class='bookmarks' data-item-id="${item.id}">
  <details>
  <summary>
    <h2>${item.title}</h2>
   
    <p>Title: <a href=${item.url} target="_blank">${item.title}</a></p> 
  </summary>
    <p>Description: ${item.desc}</p>
    <p>Rating: ${item.rating} stars</p>
    <p>URL:<a href=${item.url} target="_blank">${item.url}</a>
  </details>
    <button class="delete" type="button" value=delete>Delete</button>

  </article>
  
  `
};


///////////
// Render//
///////////

//Notes/////////////////////////////////////////
//this physically puts the the html on the page/
//also takes information for bookmark //////////
////////////////////////////////////////////////
let bookmarks = []
 let Rating = 0

  
   
let filtered= true;

// console.log('SESSION', sessionStorage)
// console.log('SESSION STORAGE BOOKMARKS', JSON.parse(sessionStorage.getItem("bookmarks")))
if (JSON.parse(sessionStorage.getItem("bookmarks")) != null)
  bookmarks = JSON.parse(sessionStorage.getItem("bookmarks"));

const render = function () {

  //console.log('render called...')

  if (store.adding) {
    //console.log('store adding generate main...')
    $('main').html(generateMain())
  }
  else {
    //console.log('main empty...')
    $('main').empty();
  }

  $("form").on("submit", async function (e) {
    e.preventDefault();
    // console.log('click')
    //  e.preventDefault()
    let apiValues = {}

    apiValues.id = $('#id').val()
    // if(!apiValues.id)
    // apiValues.id = uuidv4()

    apiValues.title = $('#title').val()
    apiValues.url = $('#url').val()
    apiValues.desc = $('#description').val()
    apiValues.rating = $("select[name='star']").val()
    apiValues.rating = parseInt(apiValues.rating.charAt(0))


    await api.createUrl(apiValues)

    bookmarks.push(apiValues)


    updateSessionStorage(bookmarks)
    e.preventDefault()
    // console.log('BOOKMARKS', bookmarks)

    $('article').html(bookmarks.map(generateBookmark))

    $("form").trigger("reset");

  })

}


////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
//////////////////// eventlisteners/////////////////////////
//////////////////////////////////////////////////////////


//toggle to open the Header
if (store.adding) {
  $('#myinfo').html(generateBookmark())
} else {
  $('#myinfo').empty();
}

const filterByRating= function(){
let rating = Rating;
let filt= [];

// const filter=filt.filter(e => e.rating === rating)
// console.log('sdf',filter)


for(let i = 0; i < bookmarks.length; i++){
  //  console.log("tester",bookmarks[i])
  if (bookmarks[i].rating >= rating) {
    
    bookmarks[i].filtered = true
    
    // filt += generateBookmark(i)
    
  }
  else{bookmarks[i].filtered= false
    
  }
}
return $('.bookmarks').html(filt)
}



//create a filter handling funciton
  //make a variable to rep the store.showRating
  //make a new array
  //do for a loop to expand bookmarks
  //make a if staement
    //asking if the bookmarks rating is less greater or equal to the rating
    //then bookmarks[i] rating filterd will be true
    //add to generate bookmark
    //close
    //else bookmarks filterd will be false
    //close
    //return $('.bookmarks').html(html)
    //;
    
    const handleFilterClick = function(){
     
      $('section').on('change', '#filter', function(e){
        console.log('clickeddd')
        e.preventDefault();
        const rating=$('#filter').val();
        console.log(rating)
        // store.newFilter(rating);
        filterByRating();
      });
    };

    //create handler for filter click
    // render $ to main on change
      //set to filter
    //set varieble to filet value
    //set to store.newFilter
      //set rating for the argument
    //close x2

const toggleClass = function () {
  //console.log('toggle class called...')
  $('#info').click(() => {
    store.toggleAddNewBookmark();
    render();
  })
}

const handleOpenBookmark = function () {
  //console.log('handle open bookmark called...')
  $('#clickMe').click(() => {
    store.toggleAddNewBookmark();
    render();
  })
};

// attaches to bookmark ids
const getItemIdFromElement = function (item) {
  //console.log('get item id from element called...')
  return $(item)
    .closest('.bookmarks')
    .data('item-id');
};

//Delete bookmark
const handleDeleteItemClicked = function () {

  // like in `handleItemCheckClicked`, we use event delegation
  $('article').on('click', '.delete', event => {
    //console.log('handle delete item clicked called...')
    const id = getItemIdFromElement(event.currentTarget);
    bookmarks = api.deleteItem(id, bookmarks)
    updateSessionStorage(bookmarks)
  });
};

//place all eventhandlers
const bindEventListeners = function () {
  handleOpenBookmark();
  handleDeleteItemClicked();
  toggleClass();
  filterByRating();
  handleFilterClick();
};
//$(bindEventListeners);

export default {
  render,
  bindEventListeners,
  bookmarks,
  
  Rating,
};
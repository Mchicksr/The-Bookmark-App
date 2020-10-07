//import { post } from "jquery";
import bookmark from './bookmark'


//Api URL
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/michaelHR/bookmarks';

//Api catcher
const listApiFetch = function (...args) {
  console.log('list api fetch called...')
  let error;
  return fetch(...args)
    .then(res => {
      if (!res.ok) {         
        error = { code: res.status };

        if (!res.headers.get('content-type').includes('json')) {
          error.message = res.statusText;
          return Promise.reject(error);
        }
      }
      return res.json();
    })
    .then(data => {
        
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }
       
      return data;
    });
};

const getSavedUrl= function() {
  console.log('get saved URL called...')
  return listApiFetch(`${BASE_URL}`)
};


// function getUrl(){
//   return fetch(`${BASE_URL}/bookmarks`).then(function(myRequest){
//     return myRequest;
//   });
    
// }


// Formats API for Bookmark
async function createUrl(bookmarks) {
  console.log('createUrl called...')
  console.log(bookmark)
  let body = JSON.stringify(bookmarks)


  await fetch(`${BASE_URL}`, {
  method: 'POST',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(bookmarks)
  }).then(res=> res.json()).then(res =>{ 
    bookmarks.id = res.id
    return res
  });
};

// const getItems = function () {
//   return listApiFetch(`${BASE_URL}/items`);
// };

//delete api bookmarks
const deleteItem = function (id = 0, bookmarks) {
  console.log('delete item called...')

  //get the id value from the bookmark
  let bkid = $(event.target).closest('article')[0].attributes[1].value

  console.log('BKID', bkid)

  //remove bookmark in ui
  $(event.target).closest('.bookmarks').remove();

  // delete from the api
  
  fetch(`${BASE_URL}/${id}`,
  { method: 'delete' })
  .then(response =>  response.json())
  .then(json => json)
  

  //delete element with id from bookmarks
  let ret = bookmarks.filter(e => e.id !== bkid)
  console.log('RET', ret)
  return ret
}


//update api bookmark
const updateUrl = function (id,update) {
  console.log('update url called...')
  return listApiFetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json',},
    body: JSON.stringify(update)
  });
};

export default {
  //getItems,
  getSavedUrl,
  createUrl,
  deleteItem,
  updateUrl,
};
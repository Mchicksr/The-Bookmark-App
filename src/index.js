
import $ from 'jquery';
import './index.css';
import api from './api';
import bookmark from './bookmark';
import store from './store';


const main = function() {
	// console.log('main called...')

	// console.log('STORE', store)
    
    // let items = api.getSavedUrl()
    // items.forEach((item)=>store.addUrl(item));
    // console.log("items",items)

    api.getSavedUrl()
    .then((items)=>{
        // console.log("TESTER 2", items)
        // $('#bookmarks-wrapper').append(items)
        /*
        1.render items to screen
        2.in fetch or return promise
        3.loop over items
        4.render bookmarks exactly as other places 
        5.go find wher bookmarks are renderd correctly
        6.use debbuger!!!
        7. what it render bookmarks correctly
        8.replace the line below with correct render bookmrks
        9. do not call for data more than once
        */
        items.forEach((item)=>store.addUrl(item));
        // bookmark.render();
        
    })
    
    bookmark.render()
    bookmark.bindEventListeners()
};

$(main);






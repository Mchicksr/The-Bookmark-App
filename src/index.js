
import $ from 'jquery';
import './index.css';
import api from './api';
import bookmark from './bookmark';
import store from './store';


const main = function() {
	console.log('main called...')

	console.log('STORE', store)
    api.getSavedUrl()
    .then((items)=>{
        items.forEach((item)=>store.addUrl(item));
        bookmark.render();
    })
    bookmark.render()
    bookmark.bindEventListeners()
};

$(main);






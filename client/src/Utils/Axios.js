import axios from 'axios';

let url = '';

class Axios {
	constructor() {
		if(localStorage.getItem('jwtToken')){
		    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');  
		}
  	}

	loginAndGetHomeMeetingsAndUsers(username, password, callback){
		if(username && password){
	      axios.post(url + '/auth/login', {username : username, password: password})
	        .then(res => {
	            if(res.data && res.data.success){
	                // console.log(res);
	                axios.defaults.headers.common['Authorization'] = res.data.token;
	                localStorage.setItem('jwtToken', res.data.token);
	                localStorage.setItem('name', res.data.name);
	                localStorage.setItem('username', res.data.username);
	                callback(null, res.data);
	            }
	          })
	        .catch((error) => {
	          	console.log(error.response);
	             if(error.response && error.response.data){
	             	if(!error.response.data.authorized){
	             		localStorage.removeItem('jwtToken');
	             		localStorage.removeItem('name');
	             		localStorage.removeItem('username');
	             		callback('unauthorized server', null);
	             	}
	             	else{
	             		callback('server error', null);
	             	}
	             }
	             else {
	             	callback(error, null);
	             }
	          });
	    }
	    else {
	      callback("Fill Up all details", null);
	    }
	}

	logout(callback){
		  localStorage.removeItem('jwtToken');
	      localStorage.removeItem('name');
	      localStorage.removeItem('username');
	      callback();
	}

	getProfile(callback){
		if(localStorage.getItem('jwtToken')){
	        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
	      
	        axios.get(url + '/auth/profile')
	          .then(res => {
	            callback(null, res.data);
	          })
	          .catch((error) => {
	          	console.log(error.response);
	             if(error.response && error.response.data){
	             	if(!error.response.data.authorized){
	             		localStorage.removeItem('jwtToken');
	             		localStorage.removeItem('name');
	             		localStorage.removeItem('username');
	             		callback('unauthorized server', null);
	             	}
	             	else{
	             		callback('server error', null);
	             	}
	             }
	             else {
	             	callback(error, null);
	             }
	          });
	          
	      }
	      else {
	        callback('unauthorized', null);
	      }
	}

	getMeeting(callback){
		if(localStorage.getItem('jwtToken')){
	        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
	      
	        axios.get(url + '/auth/meeting')
	          .then(res => {
	            callback(null, res.data);
	          })
	          .catch((error) => {
	          	console.log(error.response);
	             if(error.response && error.response.data){
	             	if(!error.response.data.authorized){
	             		localStorage.removeItem('jwtToken');
	             		localStorage.removeItem('name');
	             		localStorage.removeItem('username');
	             		callback('unauthorized server', null);
	             	}
	             	else{
	             		callback('server error', null);
	             	}
	             }
	             else {
	             	callback(error, null);
	             }
	          });
	          
	      }
	      else {
	        callback('unauthorized', null);
	      }
	}

	postMeeting(data, callback){
		if(localStorage.getItem('jwtToken')){
	        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
	      	
	        axios.post(url + '/auth/postmeeting', data)
	          .then(res => {
	            callback(null, res.data);
	          })
	          .catch((error) => {
	          	console.log(error.response);
	             if(error.response && error.response.data){
	             	if(!error.response.data.authorized){
	             		localStorage.removeItem('jwtToken');
	             		localStorage.removeItem('name');
	             		localStorage.removeItem('username');
	             		callback('unauthorized server', null);
	             	}
	             	else{
	             		callback('server error', null);
	             	}
	             }
	             else {
	             	callback(error, null);
	             }
	          });
	          
	      }
	      else {
	        callback('unauthorized local', null);
	      }
	}

	postNextMeeting(prevMeeting, data, callback){
		if(localStorage.getItem('jwtToken')){
	        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
	      
	        axios.post(url + '/auth/nextmeeting', {prevMeeting: prevMeeting, data: data})
	          .then(res => {
	            callback(null, res.data);
	          })
	          .catch((error) => {
	          	console.log(error.response);
	             if(error.response && error.response.data){
	             	if(!error.response.data.authorized){
	             		localStorage.removeItem('jwtToken');
	             		localStorage.removeItem('name');
	             		localStorage.removeItem('username');
	             		callback('unauthorized server', null);
	             	}
	             	else{
	             		callback('server error', null);
	             	}
	             }
	             else {
	             	callback(error, null);
	             }
	          });
	          
	      }
	      else {
	        callback('unauthorized', null);
	      }
	}

	editMeeting(id, data, callback){
		if(localStorage.getItem('jwtToken')){
	        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
	      
	        axios.post(url + '/auth/editmeeting', {id: id, data: data})
	          .then(res => {
	            callback(null, res.data);
	          })
	          .catch((error) => {
	          	console.log(error.response);
	             if(error.response && error.response.data){
	             	if(!error.response.data.authorized){
	             		localStorage.removeItem('jwtToken');
	             		localStorage.removeItem('name');
	             		localStorage.removeItem('username');
	             		callback('unauthorized server', null);
	             	}
	             	else{
	             		callback('server error', null);
	             	}
	             }
	             else {
	             	callback(error, null);
	             }
	          });
	          
	      }
	      else {
	        callback('unauthorized', null);
	      }
	}

	getHomeMeetingsAndUsers(date, callback){
		if(localStorage.getItem('jwtToken')){
	        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
	      
	        axios.post(url + '/auth/meetingsandusers', { date: date })
	          .then(res => {
	            callback(null, res.data);
	          })
	          .catch((error) => {
	          	console.log(error.response);
	             if(error.response && error.response.data){
	             	if(!error.response.data.authorized){
	             		localStorage.removeItem('jwtToken');
	             		localStorage.removeItem('name');
	             		localStorage.removeItem('username');
	             		callback('unauthorized server', null);
	             	}
	             	else{
	             		callback('server error', null);
	             	}
	             }
	             else {
	             	callback(error, null);
	             }
	          });
	          
	    }
	    else {
	        callback('unauthorized local', null);
	    }
	}


	getOneMeeting(id, callback){
		if(localStorage.getItem('jwtToken')){
	        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
	      
	        axios.get(url + '/auth/meeting/' + id)
	          .then(res => {
	            callback(null, res.data);
	          })
	          .catch((error) => {
	          	console.log(error.response);
	             if(error.response && error.response.data){
	             	if(!error.response.data.authorized){
	             		localStorage.removeItem('jwtToken');
	             		localStorage.removeItem('name');
	             		localStorage.removeItem('username');
	             		callback('unauthorized server', null);
	             	}
	             	else{
	             		callback('server error', null);
	             	}
	             }
	             else {
	             	callback(error, null);
	             }
	          });
	          
	      }
	      else {
	        callback('unauthorized', null);
	      }
	}

	deleteOneMeeting(id, callback){
		if(localStorage.getItem('jwtToken')){
	        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
	      
	        axios.get(url + '/auth/deletemeeting/' + id)
	          .then(res => {
	            callback(null);
	          })
	          .catch((error) => {
	          	console.log(error.response);
	             if(error.response && error.response.data){
	             	if(!error.response.data.authorized){
	             		localStorage.removeItem('jwtToken');
	             		localStorage.removeItem('name');
	             		localStorage.removeItem('username');
	             		callback('unauthorized server', null);
	             	}
	             	else{
	             		callback('server error', null);
	             	}
	             }
	             else {
	             	callback(error, null);
	             }
	          });
	          
	      }
	      else {
	        callback('unauthorized local');
	      }
	}

	updateDoneOneMeeting(id, summary, callback){
		if(localStorage.getItem('jwtToken')){
	        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
	      
	        axios.post(url + '/auth/meeting/' + id, {summary: summary})
	          .then(res => {
	            callback(null, res.data);
	          })
	          .catch((error) => {
	          	console.log(error.response);
	             if(error.response && error.response.data){
	             	if(!error.response.data.authorized){
	             		localStorage.removeItem('jwtToken');
	             		localStorage.removeItem('name');
	             		localStorage.removeItem('username');
	             		callback('unauthorized server', null);
	             	}
	             	else{
	             		callback('server error', null);
	             	}
	             }
	             else {
	             	callback(error, null);
	             }
	          });
	          
	      }
	      else {
	        callback('unauthorized local', null);
	      }
	}
}

let globalAxios = new Axios();

export default globalAxios;
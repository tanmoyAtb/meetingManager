import axios from 'axios';

let url = 'http://localhost:5000';

class Axios {
	constructor() {
		if(localStorage.getItem('jwtToken')){
		    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');  
		}
  	}

	login(username, password, callback){
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
	            if(error.response && error.response.data){
	              callback(error.response.data.msg, null);
	            }
	            else {
	              callback('Server not responding', null);
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
	             console.error(error);
	             localStorage.removeItem('jwtToken');
	             localStorage.removeItem('name');
	             localStorage.removeItem('username');
	             callback('error', null);
	          });
	          
	      }
	      else {
	        callback('error', null);
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
	             if(error.response && error.response.data){
	             	if(error.response.data.authorized){
	             		callback('Server error', null);
	             	}
	             	else{
	             		localStorage.removeItem('jwtToken');
	             		localStorage.removeItem('name');
	             		localStorage.removeItem('username');
	             		callback('error', null);
	             	}
	             }
	             else {
	             	callback('error', null);
	             }
	          });
	          
	      }
	      else {
	        callback('error', null);
	      }
	}

	postMeeting(data, callback){
		if(localStorage.getItem('jwtToken')){
	        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
	      
	        axios.post(url + '/auth/meeting', data)
	          .then(res => {
	            callback(null, res.data);
	          })
	          .catch((error) => {
	             if(error.response && error.response.data){
	             	if(error.response.data.authorized){
	             		callback('Server error', null);
	             	}
	             	else{
	             		localStorage.removeItem('jwtToken');
	             		localStorage.removeItem('name');
	             		localStorage.removeItem('username');
	             		callback('error', null);
	             	}
	             }
	             else {
	             	callback('error', null);
	             }
	          });
	          
	      }
	      else {
	        callback('error User', null);
	      }
	}
}

let globalAxios = new Axios();

export default globalAxios;
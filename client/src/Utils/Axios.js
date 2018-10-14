import axios from 'axios';

let url = '';

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
	            else {
	            	callback("Unknown error", null);
	            }
	          })
	        .catch((error) => {
	          	console.log(error.response);
	             if(error.response && error.response.data){
	             	if(!error.response.data.authorized){
	             		localStorage.removeItem('jwtToken');
	             		localStorage.removeItem('name');
	             		localStorage.removeItem('username');
	             		callback(error.response.data.msg, null);
	             	}
	             	else{
	             		callback(error.response.data.msg, null);
	             	}
	             }
	             else {
	             	callback("Unknown error", null);
	             }
	          });
	    }
	    else {
	      callback("Fill Up all details", null);
	    }
	}

	getProfile(callback){
		if(localStorage.getItem('jwtToken')){
	        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
	      
	        axios.get(url + '/auth/profile')
	          .then(res => {
	            callback(null, res.data.user);
	          })
	          .catch((error) => {
	             if(error.response){
	             	if(error.response.status === 401){
	             		localStorage.removeItem('jwtToken');
	             		localStorage.removeItem('name');
	             		localStorage.removeItem('username');
	             		callback('unauthorized server', null);
	             	}
	             	else{
	             		console.log(error);
	             		callback("server error", null);
	             	}
	             }
	             else {
	             	console.log(error);
	             	callback("server error", null);
	             }
	          });
	    }
	    else {
	        callback('unauthorized local', null);
	    }     
	}

	getUsersList(callback){
		if(localStorage.getItem('jwtToken')){
	        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
	      
	        axios.get(url + '/auth/userslist')
	          .then(res => {
	            callback(null, res.data);
	          })
	          .catch((error) => {
	             if(error.response){
	             	if(error.response.status === 401){
	             		localStorage.removeItem('jwtToken');
	             		localStorage.removeItem('name');
	             		localStorage.removeItem('username');
	             		callback('unauthorized server', null);
	             	}
	             	else{
	             		console.log(error);
	             		callback("server error", null);
	             	}
	             }
	             else {
	             	console.log(error);
	             	callback("server error", null);
	             }
	          });
	          
	    }
	    else {
	        callback('unauthorized local', null);
	    }
	}

	getUpcomingMeetings(callback){
		if(localStorage.getItem('jwtToken')){
	        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
	      
	        axios.get(url + '/auth/upcomingmeetings')
	          .then(res => {
	            callback(null, res.data);
	          })
	          .catch((error) => {
	             if(error.response){
	             	if(error.response.status === 401){
	             		localStorage.removeItem('jwtToken');
	             		localStorage.removeItem('name');
	             		localStorage.removeItem('username');
	             		callback('unauthorized server', null);
	             	}
	             	else{
	             		console.log(error);
	             		callback("server error", null);
	             	}
	             }
	             else {
	             	console.log(error);
	             	callback("server error", null);
	             }
	          });
	          
	    }
	    else {
	        callback('unauthorized local', null);
	    }
	}

	getUnresolvedMeetings(callback){
		if(localStorage.getItem('jwtToken')){
	        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
	      
	        axios.get(url + '/auth/unresolvedmeetings')
	          .then(res => {
	            callback(null, res.data);
	          })
	          .catch((error) => {
	             if(error.response){
	             	if(error.response.status === 401){
	             		localStorage.removeItem('jwtToken');
	             		localStorage.removeItem('name');
	             		localStorage.removeItem('username');
	             		callback('unauthorized server', null);
	             	}
	             	else{
	             		console.log(error);
	             		callback("server error", null);
	             	}
	             }
	             else {
	             	console.log(error);
	             	callback("server error", null);
	             }
	          });
	    }
	    else {
	        callback('unauthorized local', null);
	    }
	}

	getHistoryMeetings(callback){
		if(localStorage.getItem('jwtToken')){
	        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
	      
	        axios.get(url + '/auth/historymeetings')
	          .then(res => {
	            callback(null, res.data);
	          })
	          .catch((error) => {
	             if(error.response){
	             	if(error.response.status === 401){
	             		localStorage.removeItem('jwtToken');
	             		localStorage.removeItem('name');
	             		localStorage.removeItem('username');
	             		callback('unauthorized server', null);
	             	}
	             	else{
	             		console.log(error);
	             		callback("server error", null);
	             	}
	             }
	             else {
	             	console.log(error);
	             	callback("server error", null);
	             }
	          });
	    }
	    else {
	        callback('unauthorized local', null);
	    }
	}

	logout(callback){
		  localStorage.removeItem('jwtToken');
	      localStorage.removeItem('name');
	      localStorage.removeItem('username');
	      callback();
	}

	getMeeting(callback){
		if(localStorage.getItem('jwtToken')){
	        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
	      
	        axios.get(url + '/auth/meeting')
	          .then(res => {
	            callback(null, res.data);
	          })
	          .catch((error) => {
	             if(error.response){
	             	if(error.response.status === 401){
	             		localStorage.removeItem('jwtToken');
	             		localStorage.removeItem('name');
	             		localStorage.removeItem('username');
	             		callback('unauthorized server', null);
	             	}
	             	else{
	             		console.log(error);
	             		callback("server error", null);
	             	}
	             }
	             else {
	             	console.log(error);
	             	callback("server error", null);
	             }
	          });
	      }
	      else {
	        callback('unauthorized', null);
	      }
	}

	getAllMeetings(callback){
		if(localStorage.getItem('jwtToken')){
	        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
	      
	        axios.get(url + '/auth/allmeetings')
	          .then(res => {
	            callback(null, res.data);
	          })
	          .catch((error) => {
	             if(error.response){
	             	if(error.response.status === 401){
	             		localStorage.removeItem('jwtToken');
	             		localStorage.removeItem('name');
	             		localStorage.removeItem('username');
	             		callback('unauthorized server', null);
	             	}
	             	else{
	             		console.log(error);
	             		callback("server error", null);
	             	}
	             }
	             else {
	             	console.log(error);
	             	callback("server error", null);
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
	             if(error.response){
	             	if(error.response.status === 401){
	             		localStorage.removeItem('jwtToken');
	             		localStorage.removeItem('name');
	             		localStorage.removeItem('username');
	             		callback('unauthorized server', null);
	             	}
	             	else{
	             		console.log(error);
	             		callback("server error", null);
	             	}
	             }
	             else {
	             	console.log(error);
	             	callback("server error", null);
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
	          	console.log("got result");
	            callback(null, res.data);
	          })
	          .catch((error) => {
	          	console.log("error");
	             if(error.response){
	             	if(error.response.status === 401){
	             		localStorage.removeItem('jwtToken');
	             		localStorage.removeItem('name');
	             		localStorage.removeItem('username');
	             		callback('unauthorized server', null);
	             	}
	             	else{
	             		console.log(error);
	             		callback("server error", null);
	             	}
	             }
	             else {
	             	console.log(error);
	             	callback("server error", null);
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
	             if(error.response){
	             	if(error.response.status === 401){
	             		localStorage.removeItem('jwtToken');
	             		localStorage.removeItem('name');
	             		localStorage.removeItem('username');
	             		callback('unauthorized server', null);
	             	}
	             	else{
	             		console.log(error);
	             		callback("server error", null);
	             	}
	             }
	             else {
	             	console.log(error);
	             	callback("server error", null);
	             }
	          });
	      }
	      else {
	        callback('unauthorized', null);
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
	             if(error.response){
	             	if(error.response.status === 401){
	             		localStorage.removeItem('jwtToken');
	             		localStorage.removeItem('name');
	             		localStorage.removeItem('username');
	             		callback('unauthorized server', null);
	             	}
	             	else{
	             		console.log(error);
	             		callback("server error", null);
	             	}
	             }
	             else {
	             	console.log(error);
	             	callback("server error", null);
	             }
	          });
	      }
	      else {
	        callback('unauthorized', null);
	      }
	}

	deleteOneMeeting(id, prevId, callback){
		if(localStorage.getItem('jwtToken')){
	        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
	      
	        axios.post(url + '/auth/deletemeeting', {id: id, prevId: prevId} )
	          .then(res => {
	            callback(null);
	          })
	          .catch((error) => {
	             if(error.response){
	             	if(error.response.status === 401){
	             		localStorage.removeItem('jwtToken');
	             		localStorage.removeItem('name');
	             		localStorage.removeItem('username');
	             		callback('unauthorized server', null);
	             	}
	             	else{
	             		console.log(error);
	             		callback("server error", null);
	             	}
	             }
	             else {
	             	console.log(error);
	             	callback("server error", null);
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
	             if(error.response){
	             	if(error.response.status === 401){
	             		localStorage.removeItem('jwtToken');
	             		localStorage.removeItem('name');
	             		localStorage.removeItem('username');
	             		callback('unauthorized server', null);
	             	}
	             	else{
	             		console.log(error);
	             		callback("server error", null);
	             	}
	             }
	             else {
	             	console.log(error);
	             	callback("server error", null);
	             }
	          });
	      }
	      else {
	        callback('unauthorized local', null);
	      }
	}


	postTender(data, callback){
		if(localStorage.getItem('jwtToken')){
	        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
	      	
	        axios.post(url + '/auth/posttender', data)
	          .then(res => {
	            callback(null, res.data);
	          })
	          .catch((error) => {
	             if(error.response){
	             	if(error.response.status === 401){
	             		localStorage.removeItem('jwtToken');
	             		localStorage.removeItem('name');
	             		localStorage.removeItem('username');
	             		callback('unauthorized server', null);
	             	}
	             	else{
	             		console.log(error);
	             		callback("server error", null);
	             	}
	             }
	             else {
	             	console.log(error);
	             	callback("server error", null);
	             }
	          });
	      }
	      else {
	        callback('unauthorized local', null);
	      }
	}

	getOngoingTenders(callback){
		if(localStorage.getItem('jwtToken')){
	        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
	      	
	        axios.get(url + '/auth/ongoingtenders')
	          .then(res => {
	            callback(null, res.data);
	          })
	          .catch((error) => {
	             if(error.response){
	             	if(error.response.status === 401){
	             		localStorage.removeItem('jwtToken');
	             		localStorage.removeItem('name');
	             		localStorage.removeItem('username');
	             		callback('unauthorized server', null);
	             	}
	             	else{
	             		console.log(error);
	             		callback("server error", null);
	             	}
	             }
	             else {
	             	console.log(error);
	             	callback("server error", null);
	             }
	          });
	      }
	      else {
	        callback('unauthorized', null);
	      }
	}
	getBoughtTenders (callback){
		if(localStorage.getItem('jwtToken')){
	        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
	      	
	        axios.get(url + '/auth/boughttenders')
	          .then(res => {
	            callback(null, res.data);
	          })
	          .catch((error) => {
	             if(error.response){
	             	if(error.response.status === 401){
	             		localStorage.removeItem('jwtToken');
	             		localStorage.removeItem('name');
	             		localStorage.removeItem('username');
	             		callback('unauthorized server', null);
	             	}
	             	else{
	             		console.log(error);
	             		callback("server error", null);
	             	}
	             }
	             else {
	             	console.log(error);
	             	callback("server error", null);
	             }
	          });
	      }
	      else {
	        callback('unauthorized', null);
	      }
	}

	getDroppedTenders (callback){
		if(localStorage.getItem('jwtToken')){
	        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
	      	
	        axios.get(url + '/auth/droppedtenders')
	          .then(res => {
	            callback(null, res.data);
	          })
	          .catch((error) => {
	             if(error.response){
	             	if(error.response.status === 401){
	             		localStorage.removeItem('jwtToken');
	             		localStorage.removeItem('name');
	             		localStorage.removeItem('username');
	             		callback('unauthorized server', null);
	             	}
	             	else{
	             		console.log(error);
	             		callback("server error", null);
	             	}
	             }
	             else {
	             	console.log(error);
	             	callback("server error", null);
	             }
	          });
	      }
	      else {
	        callback('unauthorized', null);
	      }
	}

	getRewardedTenders (callback){
		if(localStorage.getItem('jwtToken')){
	        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
	      	
	        axios.get(url + '/auth/rewardedtenders')
	          .then(res => {
	            callback(null, res.data);
	          })
	          .catch((error) => {
	             if(error.response){
	             	if(error.response.status === 401){
	             		localStorage.removeItem('jwtToken');
	             		localStorage.removeItem('name');
	             		localStorage.removeItem('username');
	             		callback('unauthorized server', null);
	             	}
	             	else{
	             		console.log(error);
	             		callback("server error", null);
	             	}
	             }
	             else {
	             	console.log(error);
	             	callback("server error", null);
	             }
	          });
	      }
	      else {
	        callback('unauthorized', null);
	      }
	}
  
	updateScheduleBought(id, callback){
		if(localStorage.getItem('jwtToken')){
	        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
	      	
	        axios.post(url + '/auth/updateschedulebought', { id: id} )
	          .then(res => {
	            callback(null, res.data);
	          })
	          .catch((error) => {
	             if(error.response){
	             	if(error.response.status === 401){
	             		localStorage.removeItem('jwtToken');
	             		localStorage.removeItem('name');
	             		localStorage.removeItem('username');
	             		callback('unauthorized server', null);
	             	}
	             	else{
	             		console.log(error);
	             		callback("server error", null);
	             	}
	             }
	             else {
	             	console.log(error);
	             	callback("server error", null);
	             }
	          });
	      }
	      else {
	        callback('unauthorized', null);
	      }
	}

	updateScheduleDropped(id, callback){
		if(localStorage.getItem('jwtToken')){
	        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
	      	
	        axios.post(url + '/auth/updatescheduledropped', { id: id})
	          .then(res => {
	            callback(null, res.data);
	          })
	          .catch((error) => {
	             if(error.response){
	             	if(error.response.status === 401){
	             		localStorage.removeItem('jwtToken');
	             		localStorage.removeItem('name');
	             		localStorage.removeItem('username');
	             		callback('unauthorized server', null);
	             	}
	             	else{
	             		console.log(error);
	             		callback("server error", null);
	             	}
	             }
	             else {
	             	console.log(error);
	             	callback("server error", null);
	             }
	          });
	      }
	      else {
	        callback('unauthorized', null);
	      }
	}

	updateWorkRewarded(id, callback){
		if(localStorage.getItem('jwtToken')){
	        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
	      	
	        axios.post(url + '/auth/updateworkrewarded ', { id: id})
	          .then(res => {
	            callback(null, res.data);
	          })
	          .catch((error) => {
	             if(error.response){
	             	if(error.response.status === 401){
	             		localStorage.removeItem('jwtToken');
	             		localStorage.removeItem('name');
	             		localStorage.removeItem('username');
	             		callback('unauthorized server', null);
	             	}
	             	else{
	             		console.log(error);
	             		callback("server error", null);
	             	}
	             }
	             else {
	             	console.log(error);
	             	callback("server error", null);
	             }
	          });
	      }
	      else {
	        callback('unauthorized', null);
	      }
	}

	onEditNote(id, note, callback){
		if(localStorage.getItem('jwtToken')){
	        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
	      	
	        axios.post(url + '/auth/editnotetender', { id: id, note: note})
	          .then(res => {
	            callback(null, res.data);
	          })
	          .catch((error) => {
	             if(error.response){
	             	if(error.response.status === 401){
	             		localStorage.removeItem('jwtToken');
	             		localStorage.removeItem('name');
	             		localStorage.removeItem('username');
	             		callback('unauthorized server', null);
	             	}
	             	else{
	             		console.log(error);
	             		callback("server error", null);
	             	}
	             }
	             else {
	             	console.log(error);
	             	callback("server error", null);
	             }
	          });
	      }
	      else {
	        callback('unauthorized', null);
	      }
	}

	onDeleteTender(id, callback){
		if(localStorage.getItem('jwtToken')){
	        axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
	      	
	        axios.post(url + '/auth/deletetender', { id: id})
	          .then(res => {
	            callback(null, res.data);
	          })
	          .catch((error) => {
	             if(error.response){
	             	if(error.response.status === 401){
	             		localStorage.removeItem('jwtToken');
	             		localStorage.removeItem('name');
	             		localStorage.removeItem('username');
	             		callback('unauthorized server', null);
	             	}
	             	else{
	             		console.log(error);
	             		callback("server error", null);
	             	}
	             }
	             else {
	             	console.log(error);
	             	callback("server error", null);
	             }
	          });
	      }
	      else {
	        callback('unauthorized', null);
	      }
	}
}

let globalAxios = new Axios();

export default globalAxios;
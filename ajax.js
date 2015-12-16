function ajax(params){

	var method = params.method||'GET',
		url = params.url||document.location.href,
		async = params.async||true,
		data = params.data||null,
		dataStr = '';

	if ( !params.success ){ params.success = function(data){ return data; }; }
	if ( !params.error ){ params.error = function(){ return false; }; }

	var request = new XMLHttpRequest();
		request.open(method, url, async);

	request.onload = function() {
	  if (request.status >= 200 && request.status < 400) {
	    
	    if ( params.success && typeof params.success === 'function' ){	    	
	    	params.success(request.responseText);
	    }
	    
	  } else {

	    if ( params.error && typeof params.error === 'function' ){	    	
	    	params.error();
	    }

	  }
	};

	request.onerror = function() {
	  console.error('error while sending ajax request.');
	};

	if ( params.method == 'GET' ){ 		
		data = null;
	}else{
		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		for ( var k in data ){
			if (dataStr.length > 0) {
                dataStr += '&';
            }
			dataStr += encodeURIComponent(k)+'='+encodeURIComponent(data[k]);
		}
		data = dataStr;
	}
	
	request.send(data);

}
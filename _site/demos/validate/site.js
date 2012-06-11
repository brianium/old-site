(function(){
	var validator = new FormValidator('test',[
		{
			name:'required',
			display:'Required',
			rules:'required'
		},
		{
			name:'email',
			display:'Email',
			rules:'required|valid_email'
		},
		{
			name:'pass',
			display:'Password',
			rules:'required|matches[passConf]'
		},
		{
			name:'minlength',
			display:'Min length',
			rules:'required|min_length[5]'
		},
		{
			name:'maxlength',
			display:'Max length',
			rules:'required|max_length[10]'
		},
		{
			name:'exactlength',
			display:'Exact length',
			rules:'required|exact_length[5]'
		},
		{
			name:'greaterthan',
			display:'Greater than',
			rules:'required|greater_than[3]'
		},
		{
			name:'lessthan',
			display:'Less than',
			rules:'required|less_than[10]'
		},
		{
			name:'alpha',
			display:'Alpha',
			rules:'required|alpha'
		},
		{
			name:'alphanum',
			display:'Alpha numeric',
			rules:'required|alpha_numeric'
		},
		{
			name:'alphadash',
			display:'Alpha dash',
			rules:'required|alpha_dash'
		},
		{
			name:'numeric',
			display:'Numeric',
			rules:'required|numeric'
		},
		{
			name:'integer',
			display:'Integer',
			rules:'required|integer'
		},
		{
			name:'ham',
			display:'Ham sandwich',
			rules:'required|callback_ham_sandwich'
		}
	],function(errors){
		var frm = document.getElementById('test'),
			prnt = frm.parentNode,
			errorList = document.getElementById('errors') || document.createElement('ul');
		if (! errors.id ) {
			prnt.insertBefore(errorList,frm);
			errorList.id = 'errors';
		}
		errorList.innerHTML = '';

		if ( errors.length > 0 ) {
			for ( var i = 0,j = errors.length; i < j; i++ ) {
				var item = document.createElement('li'),
					txt = document.createTextNode(errors[i]);
				item.appendChild(txt);
				errorList.appendChild(item);
			}
		}
	});

	validator.registerCallback('ham_sandwich',function(value){
		if ( /ham/g.exec(value) ) {
			return true;
		}
		return false;
	}).setMessage('ham_sandwich','Ham sandwich must always have the word ham in it');
})();
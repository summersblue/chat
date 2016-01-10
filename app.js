
	var parseApplicationId="Jdx0jq4oK1gn6LlPpiJoiXMqSQQUk7eIqEX1N8bh";
	var parseJavaScriptKey="YK2Uegwu7pqbjbaCxkAGSlY7H3YLXXoweRe8qIfY";
	$(document).ready(function(){
		getMessages();
		$("send").click(function(){
			var username =$('input[name=username]').attr('value');
			var message = $('input[name=message]').attr('value');
			console.log(username)
			console.log('!')
			$.ajax({
				url:'https://api.parse.com/1/classes/MessageBoard',
				headers:{
					'X-Parse-Application-Id':parseID,
					'X-Parse-REST-API-key':parseRestKey
				},
				contentType:'application/json',
				dataType:'json',
				processData:false,
				data:JSON.stringify({
					'username':username,
					'message':message
				}),
				TYPE:'POST',
				success:function(){
					console.log('sent');
					getMessages();
				},
				error:function(){
					console.log('error');
				}
			});
		})

		function getmessages(){
			$.ajax({
				url:'https://api.parse.com/1/classes/MessageBoard',
				headers:{
					'X-Parse-Application-Id':parseID,
					'X-Parse-REST-API-key':parseRestKey
				},
				contentType:'application/json',
				dataType:'json',
				type:'GET',
				success:function(data){
					console.log('get');
					updateView(data);
				},
				error:function(){
					console.log('error');
				}
			});
		}
		function updateView(messages){
			var table=$('.table tbody');
			table.html('');
			$.each(messages.results,function(index,value){
				var trE1 =
				$('<tr><td>'
					+value.username
					+'</td><td>'
					+value.message+
					'</td><tr>');
				table.append(trE1);
			});
			console.log(messages);
		}
		
	Parse.initialize(parseApplicationId,parseJavaScriptKey);
	var Test = Parse.Object.extend("Test");
	var test = new Test();
	test save({
		name:"John",
		text:"hi"
	},{
success:function(object){
	console.log("Parse.com object is saved:"+object);
	//or other way
	// alert("parse.com object is saved");
},
error:function(object){
	console.log("Error!Parse.com object is not saved:"+object);
}

	});
})
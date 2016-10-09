module.exports = function (io) {

	console.log('hello');

	io.on('connection', function(socket) {
	    console.log('User connected via socket.io.');

	    socket.on('message', function(message) {
	        console.log('Message received: ' + message.text);

	        io.emit('message', message);
	        //socket.broadcast.emit('message', message);
	    });

	    socket.emit('message', {
	        text: 'Welcome to the chat application.'
	    });
	});
}
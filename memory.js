var user_a  = [
        'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25', 
        'Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25', 
        'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.101 Safari/537.36' 
    ], 
    Pageres = require('pageres'),
    express = require('express'),
    app     = express(),
    server  = app.listen(8080),
    io      = require('socket.io').listen(server);

app.use(express.static(__dirname));   

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/home.html');
});

io.on('connection', function(socket) {
    socket.on('message', function(uri){
        uploader(uri);
    });

    socket.on('error', function(e) {
    	console.log(e);
    });
});

function uploader(uri) { 
  	for (var i=0, h=user_a.length; i<h; i++) {
        i==1 ? width=600 : i==2 ? width=700 : width=320;

        snapshot(uri, user_a[i], width);
    }	
}

function snapshot(url, agent, width){  
	var pageres = new Pageres({delay: 2})
    .src(url, [width+'x320'], {userAgent: agent})
    .dest(__dirname);

	pageres.run(function (err) {
        if(err){
            console.log(err);
        }else{
	        io.emit('image', false);
	        console.log('done');
	    }
    });
}

console.log('Open localhost with port 8080');

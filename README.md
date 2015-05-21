# Pageres Memory Leak
Download the file and use this with Pageres.

* Run memory.js and point your browser to localhost:8080
* Input any url and wait for Pageres to take screeshots.
* Once Pageres completes, repeat this process for three more times [Each time three diff resolutions/useragents is used for generating screeshots].
* So on fourth [3*4] run when the count of the process.on('SIGINT') listener crosses 11 listeners this warning is generated.
#Other test that don't generate this warning
* When Pageres is not used with a server and if we are taking more than 11 screenshots no memory leak warning is generated.
* When Pageres is used with a server commenting out the process.on('SIGINT') listener solves this warning.


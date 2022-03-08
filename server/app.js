const http = require('http'); // node가 http 모듈을 제공

http.createServer(() => {
  console.log(req.url, req.mtehod);
  res.end('Hello!')
});

http.listen(3030);
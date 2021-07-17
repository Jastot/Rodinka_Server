const { exception } = require('console');
const http = require('http');

function reqCNN(buffer, callback){
    let data = JSON.stringify({
        "image": buffer
    });
    let options = {
        hostname:'localhost',
        port: 5005,
        path: '/',
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json',
            'content-length': data.length,
            'user-agent': 'localhost_request'
        }
    };

    const req = http.request(options, res=>{ 
        console.log(`Status code: ${res.statusCode}`);
        let chunks = '';
        res.on('data', chunk=>{
            chunks+=chunk;
        });
        res.on('end', ()=>{
            callback(chunks);
        });
    });
    req.on('error', err=>{
        throw exception(`HTTP REQUEST ERROR: ${err}`);
    });
    req.write(data);
    req.end();
}

// Example:
// let buffer = fs.readFileSync('./data/_data/test/malignant/1267_1.jpg');
// reqCNN(buffer, data=>console.log(data));

exports.reqCNN = reqCNN;

//aulit 14.07.21
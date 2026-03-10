const http = require('https');
const fs = require('fs');

const req = http.request('https://bazaar-x-backend.vercel.app/api/user/is-auth', {
    method: 'OPTIONS',
    headers: {
        'Origin': 'https://bazaar-x-frontend-gold.vercel.app',
        'Access-Control-Request-Method': 'GET',
        'Access-Control-Request-Headers': 'authorization, x-client-info, apikey, content-type'
    }
}, (res) => {
    fs.writeFileSync('headers.json', JSON.stringify({ OPTIONS: res.headers }, null, 2));
    
    // now do GET
    const req2 = http.request('https://bazaar-x-backend.vercel.app/api/user/is-auth', {
        method: 'GET',
        headers: {
            'Origin': 'https://bazaar-x-frontend-gold.vercel.app'
        }
    }, (res2) => {
        let headers = JSON.parse(fs.readFileSync('headers.json'));
        headers.GET = res2.headers;
        fs.writeFileSync('headers.json', JSON.stringify(headers, null, 2));
    });
    req2.end();
});
req.end();

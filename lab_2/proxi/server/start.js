const app = require('../router/app.js');
let config = require('../service/config.js');

app.listen(config.get('port'), () => {
     console.log('Server start at localhost: 3001');
});
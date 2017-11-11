let express = require('express');
let path = require('path');

let app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.listen(3000, () => {
    console.log('Server listening on http://localhost:3000');
});

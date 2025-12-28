
const app = require('./app');
const main = require('../db');

const PORT = process.env.PORT || 3000;


main();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

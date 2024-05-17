const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dbConnect = require('./config/database.config');
const { PORT } = require('./api/helpers/env');
const app = express();

app.use(morgan('dev'));
app.use(cors());

app.use(express.json());

routes(app);

//end points
app.use((req, res) => {
    res.status(404).json({ message: 'API Not Found' });
});
app.use((err, req, res, next) => {
    let status = err.status || 500;

    res.status(status).json({ msg: `${err.message}`, status })
})
dbConnect()
	.then(async () => {
		console.log('Connected to MongoDB');
		app.listen(PORT, () => console.log(`Listenning to port ${PORT}...`));
	})
	.catch((err) => console.log('Db Connection Error: ' + err));

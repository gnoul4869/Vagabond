import express from 'express';
import cors from 'cors';
import xss from 'xss-clean';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(xss());

app.get('/', (req, res) => {
    res.send('hello world');
});

const start = async () => {
    try {
        app.listen(port, console.log(`Server is listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
};

start();

import cors from 'cors'
import routes from './routes/cart'
import express from 'express';


const app = express();

const port = 3001;
app.use(cors());

app.use(express.json());
app.use('/', routes)

app.listen(port, ()=> console.log(`Listen on port: ${port}`));
app.get('/', (request, response) => {
    response.send('Hello');
});

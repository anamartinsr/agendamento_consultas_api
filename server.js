import cors from 'cors';
import app from './app.js';

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    app.use(cors());

    res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use(cors());
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
    console.log(`http://localhost:${port}`);
});

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import TaskRoutes from './routes/tasks.routes'

const app = express();

//Setting
app.set('port', process.env.PORT || 3000);

//Middlewares
const corsOptions = {}
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to my app' });
})

app.use('/api/tasks', TaskRoutes);

export default app;
import express from 'express';
import UserRouter from './user.routes.js';
import feedbackRouter from './feedback.routes.js';



const apiRouter = express.Router();

  
apiRouter.use('/auth', UserRouter);
apiRouter.use('/feedback', feedbackRouter);



export default apiRouter;

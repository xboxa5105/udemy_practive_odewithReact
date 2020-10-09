import express from 'express';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import billingRoutes from './routes/billingRoutes';
import keys from './config/keys';
import passport from './services/passport';

const app = express();
app.use(bodyParser.json());
mongoose.connect(
  `mongodb+srv://${keys.mongodbUsername}:${keys.mongodbPassword}@cluster0-uha59.mongodb.net/test?retryWrites=true&w=majority`,
);

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  }),
);
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
billingRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

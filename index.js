import express from 'express';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import authRoutes from './routes/authRoutes';
import keys from './config/keys';
import passport from './services/passport';

const app = express();
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

const PORT = process.env.PORT || 5000;
app.listen(PORT);

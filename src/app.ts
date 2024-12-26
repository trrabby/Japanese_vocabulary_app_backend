/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/MiddleWares/globalerrorhandler';
import router from './app/routes';
import notFound from './app/MiddleWares/notFound';
import jwt, { JwtPayload } from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import { UserModel } from './app/modules/users/user.model';
import config from './app/config';
import catchAsync from './app/utils/catchAsync';

const app: Application = express();

//parser
app.use(express.json());
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'https://tokyobangla.netlify.app',
    ],
    credentials: true,
  }),
);
app.use(cookieParser());

const cookieOptions: {
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'strict' | 'none';
} = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
};

// Login Endpoint
app.post('/api/v1/login', async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  try {
    // Find user in the database
    const user = await UserModel.findOne({ email }); // Replace with your DB query logic
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Compare passwords directly (plaintext)
    if (parseInt(user.password) !== parseInt(password)) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
      photoUrl: user.photoUrl,
    };
    const token = jwt.sign(payload, config.access_token as string, {
      expiresIn: '1d',
    });

    // Set the token in a cookie
    res
      .cookie('token', token, cookieOptions)
      .send({ success: true, user: payload });
  } catch (err) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

// Middleware to Verify Token
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).send({ message: 'Unauthorized access' });
  }

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err: any, decoded: any) => {
      if (err) {
        return res.status(401).send({ message: 'Unauthorized access' });
      }
      req.user = decoded as JwtPayload; // Attach user data to request
      next();
    },
  );
};

// Logout Endpoint
app.post('/api/v1/logout', async (req: Request, res: Response) => {
  res
    .clearCookie('token', { ...cookieOptions, maxAge: 0 })
    .send({ success: true });
});

app.get('/', (req: Request, res: Response) => {
  res.send('Server is live');
});

// application routes
app.use('/api/v1', router);

//global error handler
app.use(globalErrorHandler);

// Not Found
app.use(notFound);

export default app;

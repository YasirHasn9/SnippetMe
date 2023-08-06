import express, { Request, Response, NextFunction } from 'express';
import { UserController } from '../controllers/user.controller';
import {
  validateUserSchema,
  validateDuplicate,
  isIdValid,
  isValidUser,
} from '../middlewares/userValidation.middleware';

const router = express.Router();

router.post(
  '/register',
  validateUserSchema,
  validateDuplicate,
  async (req: Request, res: Response, next: NextFunction) => {
    UserController.userRegister(req, res, next);
  },
);

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  UserController.userLogin(req, res, next);
});

// I maybe need to restrict this controller for only these who have an admin role.
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  UserController.findUsers(req, res, next);
});

router.get('/:id', isIdValid, isValidUser, async (req: Request, res: Response, next: NextFunction) => {
  UserController.findUserById(req, res, next);
});

router.put(
  '/:id',
  isIdValid,
  isValidUser,
  validateDuplicate,
  async (req: Request, res: Response, next: NextFunction) => {
    UserController.updatedUserById(req, res, next);
  },
);

router.delete('/:id', isIdValid, isValidUser, async (req: Request, res: Response, next: NextFunction) => {
  UserController.removeUserById(req, res, next);
});

export { router as userRoutes };

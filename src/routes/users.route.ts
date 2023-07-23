import express, { Request, Response, NextFunction } from 'express';
import { UserController } from '../controllers/user.controller';
import { validateUserSchema, validateDuplicate, idIsValid } from '../middlewares/userValidation.middleware';

const router = express.Router();

router.post('/', validateUserSchema, validateDuplicate, async (req: Request, res: Response, next: NextFunction) => {
  UserController.createUser(req, res, next);
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  UserController.findUsers(req, res, next);
});

router.get('/:id', idIsValid, async (req: Request, res: Response, next: NextFunction) => {
  UserController.findUserById(req, res, next);
});

router.put('/:id', idIsValid, validateDuplicate, async (req: Request, res: Response, next: NextFunction) => {
  UserController.updatedUserById(req, res, next);
});

router.delete('/:id', idIsValid, async (req: Request, res: Response, next: NextFunction) => {
  UserController.removeUserById(req, res, next);
});

export { router as userRoutes };

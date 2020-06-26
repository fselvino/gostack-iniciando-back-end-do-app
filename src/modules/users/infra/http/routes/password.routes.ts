import { Router } from 'express';
import ForgotPasswordController from '../../Controllers/ForgotPasswordController';
import ResetPasswordController from '../../Controllers/ResetPasswordController;

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

// cria uma sessão
passwordRouter.post('/forgot', forgotPasswordController.create);
passwordRouter.post('/reset', resetPasswordController.c)
export default passwordRouter;

"use strict";
/**
 * Soc: Separation od Concerns - Separançao de preocupaçoes
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
// DTO - Data Transfer Object - Objeto de transferencia de dados
// Rota: Recebe a requisiçao, chamar outro arquivo, devolver uma resposta
var express_1 = require("express");
var celebrate_1 = require("celebrate");
var ensureAuthenticated_1 = __importDefault(require("@modules/users/infra/http/middlewares/ensureAuthenticated"));
var AppointmetsController_1 = __importDefault(require("../../controllers/AppointmetsController"));
var ProviderAppointmentsController_1 = __importDefault(require("../../controllers/ProviderAppointmentsController"));
var appointmetRoutes = express_1.Router();
var appointmentsController = new AppointmetsController_1.default();
var providerAppointmentsController = new ProviderAppointmentsController_1.default();
appointmetRoutes.use(ensureAuthenticated_1.default);
appointmetRoutes.post('/', celebrate_1.celebrate((_a = {},
    _a[celebrate_1.Segments.BODY] = {
        provider_id: celebrate_1.Joi.string().uuid().required(),
        date: celebrate_1.Joi.date(),
    },
    _a)), appointmentsController.create);
appointmetRoutes.get('/me', providerAppointmentsController.index);
exports.default = appointmetRoutes;

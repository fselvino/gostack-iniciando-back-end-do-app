"use strict";
/**
 * Soc: Separation od Concerns - Separançao de preocupaçoes
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
// DTO - Data Transfer Object - Objeto de transferencia de dados
// Rota: Recebe a requisiçao, chamar outro arquivo, devolver uma resposta
var celebrate_1 = require("celebrate");
var express_1 = require("express");
var ensureAuthenticated_1 = __importDefault(require("@modules/users/infra/http/middlewares/ensureAuthenticated"));
var ProvidersController_1 = __importDefault(require("../../controllers/ProvidersController"));
var ProviderDayAvailabilityController_1 = __importDefault(require("../../controllers/ProviderDayAvailabilityController"));
var ProviderMonthAvailabilityController_1 = __importDefault(require("../../controllers/ProviderMonthAvailabilityController"));
var providersRoutes = express_1.Router();
var providersController = new ProvidersController_1.default();
var providerDayAvailabilityController = new ProviderDayAvailabilityController_1.default();
var providerMonthAvailabilityController = new ProviderMonthAvailabilityController_1.default();
providersRoutes.use(ensureAuthenticated_1.default);
providersRoutes.get('/', providersController.index);
providersRoutes.get('/:provider_id/month-availability', celebrate_1.celebrate((_a = {},
    _a[celebrate_1.Segments.PARAMS] = {
        provider_id: celebrate_1.Joi.string().uuid().required(),
    },
    _a)), providerMonthAvailabilityController.index);
providersRoutes.get('/:provider_id/day-availability', celebrate_1.celebrate((_b = {},
    _b[celebrate_1.Segments.PARAMS] = {
        provider_id: celebrate_1.Joi.string().uuid().required(),
    },
    _b)), providerDayAvailabilityController.index);
exports.default = providersRoutes;

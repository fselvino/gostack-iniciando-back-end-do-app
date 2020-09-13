"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _AppointmetsController = _interopRequireDefault(require("../../controllers/AppointmetsController"));

var _ProviderAppointmentsController = _interopRequireDefault(require("../../controllers/ProviderAppointmentsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Soc: Separation od Concerns - Separançao de preocupaçoes
 */
// DTO - Data Transfer Object - Objeto de transferencia de dados
// Rota: Recebe a requisiçao, chamar outro arquivo, devolver uma resposta
const appointmetRoutes = (0, _express.Router)();
const appointmentsController = new _AppointmetsController.default();
const providerAppointmentsController = new _ProviderAppointmentsController.default();
appointmetRoutes.use(_ensureAuthenticated.default);
appointmetRoutes.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    provider_id: _celebrate.Joi.string().uuid().required(),
    date: _celebrate.Joi.date()
  }
}), appointmentsController.create);
appointmetRoutes.get('/me', providerAppointmentsController.index);
var _default = appointmetRoutes;
exports.default = _default;
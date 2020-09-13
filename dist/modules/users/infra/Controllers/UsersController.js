"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _CreateUserSevice = _interopRequireDefault(require("../../services/CreateUserSevice"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersController {
  async create(request, response) {
    const {
      name,
      email,
      password
    } = request.body;

    const createUser = _tsyringe.container.resolve(_CreateUserSevice.default);

    const user = await createUser.execute({
      name,
      email,
      password
    });
    delete user.password;
    return response.json((0, _classTransformer.classToClass)(user));
  } // public async index(request: Request, response: Response): Promise<Response> {
  //   const appointments = await appointmentsRepository.find();
  //   return response.json(appointments);
  // }


}

exports.default = UsersController;
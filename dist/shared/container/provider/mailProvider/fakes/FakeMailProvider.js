"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class FakeMailProvider {
  constructor() {
    this.messagem = [];
  }

  async sendMail(message) {
    this.messagem.push(message);
  }

}

exports.default = FakeMailProvider;
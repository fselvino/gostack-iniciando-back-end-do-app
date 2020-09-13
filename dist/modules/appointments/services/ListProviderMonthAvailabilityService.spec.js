"use strict";

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

var _ListProviderMonthAvailabilityService = _interopRequireDefault(require("./ListProviderMonthAvailabilityService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import AppError from '@shared/errors/AppError';
let fakeAppointmentsRepopository;
let listProviderMonthAvailability;
describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepopository = new _FakeAppointmentsRepository.default();
    listProviderMonthAvailability = new _ListProviderMonthAvailabilityService.default(fakeAppointmentsRepopository);
  });
  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepopository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 3, 20, 8, 0, 0)
    });
    await fakeAppointmentsRepopository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 20, 8, 0, 0)
    });
    await fakeAppointmentsRepopository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 20, 9, 0, 0)
    });
    await fakeAppointmentsRepopository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 20, 10, 0, 0)
    });
    await fakeAppointmentsRepopository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 20, 11, 0, 0)
    });
    await fakeAppointmentsRepopository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 20, 12, 0, 0)
    });
    await fakeAppointmentsRepopository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 20, 13, 0, 0)
    });
    await fakeAppointmentsRepopository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0)
    });
    await fakeAppointmentsRepopository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0)
    });
    await fakeAppointmentsRepopository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 20, 16, 0, 0)
    });
    await fakeAppointmentsRepopository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 20, 17, 0, 0)
    });
    await fakeAppointmentsRepopository.create({
      provider_id: 'user',
      user_id: 'user',
      date: new Date(2020, 4, 21, 8, 0, 0)
    });
    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 5
    }); // espero que seja um array com os dias 20 e 21 com available: false

    expect(availability).toEqual(expect.arrayContaining([{
      day: 19,
      available: true
    }, {
      day: 20,
      available: false
    }, {
      day: 21,
      available: true
    }, {
      day: 22,
      available: true
    }]));
  });
});
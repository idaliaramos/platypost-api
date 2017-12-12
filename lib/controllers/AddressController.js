const EntityController = require('./EntityController');

class AddressController extends EntityController {
  constructor({ addressService, userService }) {
    super({
      entityName: 'Address',
      entityService: addressService
    });
    this._userService = userService;
    // this._bindMethods(['createForUser', 'findByUserId']);
  }
  async createForUser(request, response, next) {
    try {
      const { id: userId } = request.params;
      let attributes = request.body;
      const newAddress = await this._entityService.createForUser(
        userId,
        attributes
      );
      response.json(newAddress);
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = AddressController;

// const { isFunction } = require('../utils/LangUtils');
// const { noop } = require('../utils/FunctionUtils');
// const { pick, omit } = require('../utils/ObjectUtils');
const userRepository = require('../instances/userRepository');
const addressRepository = require('../instances/addressRepository');
class AddressService {
  constructor() {
    console.log('in the constructor for Address Service');
  }

  async createForUser(userId, attributes) {
    try {
      const user = await userRepository.getById(userId);
      // return await this._addressRepository.create(
      return await addressRepository.create(
        Object.assign({}, attributes, {
          userId: user.id
        })
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
module.exports = AddressService;

const userRepository = require('../instances/userRepository');
const mailRepository = require('../instances/mailRepository');
class AddressService {
  constructor() {
    console.log('in the constructor for MailService');
  }

  async createForUser(userId, attributes) {
    try {
      const user = await userRepository.getById(userId);
      return await mailRepository.create(
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

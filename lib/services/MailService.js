// const bcrypt = require('bcryptjs');

const { omit } = require('../utils/ObjectUtils');

// const userRepository = require('../instances/userRepository');
// const mailRepository = require('../instances/mailRepository');
class MailService {
  constructor({
    // mailValidator,
    mailRepository,
    userRepository
    // logError
  }) {
    // this._mailValidator = mailValidator;
    this._mailRepository = mailRepository;
    this._userRepository = userRepository;
    // this._logError = isFunction(logError) ? logError : noop;
  }
  async _getAuthenticatedUser(authentication) {
    // const { userId: authenticatedUserId } = authentication;
    //TODO: dont understand this deconstruction and why it doesnt work here, was getting undef
    const authenticatedUserId = authentication;
    if (!Number.isFinite(authenticatedUserId)) return null;
    const authenticatedUser = await this._userRepository.getById(
      authenticatedUserId
    );
    console.log(authenticatedUser, 'new auth user :)');
    return omit(authenticatedUser, 'hashedPassword');
  }

  async createForUser(userId, attributes) {
    try {
      const user = await this._userRepository.getById(userId);
      return await this._mailRepository.create(
        Object.assign({}, attributes, {
          userId: user.id
        })
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findByUserId(userId, authentication) {
    const authenticatedUser = await this._getAuthenticatedUser(authentication);
    console.log(authenticatedUser, 'auth user');
    if (!authenticatedUser) throw this._createPermissionDeniedError();
    // if (authenticatedUser.id != userId) {
    //   throw Boom.unauthorized('invalid request');
    // }
    //logging right userId
    return await this._mailRepository.findByAttribute('userId', userId);
  }
}
module.exports = MailService;

const { isFunction } = require('../utils/LangUtils');
const { noop } = require('../utils/FunctionUtils');
// const { pick, omit } = require('../utils/ObjectUtils');
const Boom = require('boom');
class HistoryService {
  constructor({
    historyValidator,
    historyRepository,
    userRepository,
    logError
  }) {
    this._historyValidator = historyValidator;
    this._historyRepository = historyRepository;
    this._userRepository = userRepository;
    this._logError = isFunction(logError) ? logError : noop;
  }
  async _getAuthenticatedUser(authentication) {
    // const { userId: authenticatedUserId } = authentication;
    //authentication is undefined ,, again..
    console.log(authentication, 'authentication');
    // const authenticatedUserId = authentication.userId;
    const authenticatedUserId = authentication;
    console.log(authenticatedUserId, 'auth id');
    if (!Number.isFinite(authenticatedUserId)) return null;
    return await this._userRepository.getById(authenticatedUserId);
  }

  async findByUserId(userId, authentication) {
    console.log(userId, authentication, 'i am in the history service step 2');
    const authenticatedUser = await this._getAuthenticatedUser(authentication);
    console.log(authenticatedUser, 'auth user');
    if (!authenticatedUser) throw this._createPermissionDeniedError();
    // if (authenticatedUser.id != userId) {
    //   throw Boom.unauthorized('invalid request');
    // }
    return await this._historyRepository.findByAttribute('userId', userId);
  }
}
module.exports = HistoryService;

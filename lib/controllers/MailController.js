const EntityController = require('./EntityController');

class MailController extends EntityController {
  constructor({ mailService, userService }) {
    super({
      entityName: 'Mail',
      entityService: mailService
    });
    this._userService = userService;
    this._bindMethods(['createForUser', 'findByUserId']);
  }
  async createForUser(request, response, next) {
    try {
      const { id: userId } = request.params;
      let attributes = request.body;
      const newMail = await this._entityService.createForUser(
        userId,
        attributes
      );
      response.json(newMail);
    } catch (error) {
      console.log(error);
    }
  }

  async findByUserId(request, response, next) {
    try {
      const { id: userId } = request.params;
      const user = await this._userService.getById(userId);
      const history = await this._entityService.findByUserId(
        user.id,
        request.authenticatedUserId
      );
      response.json(history);
    } catch (error) {
      response.sendStatus(401);
    }
    // this._historyService.findByUserId(userId);
  }

  _bindMethods(methodNames) {
    methodNames.forEach(methodName => {
      this[methodName] = this[methodName].bind(this);
    });
  }
}
module.exports = MailController;

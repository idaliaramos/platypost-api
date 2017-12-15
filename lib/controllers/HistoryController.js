const EntityController = require('./EntityController');

class HistoryController extends EntityController {
  constructor({ historyService, userService }) {
    super({
      entityName: 'History',
      entityService: historyService
    });
    this._userService = userService;
    this._bindMethods(['findByUserId']);
  }

  async findByUserId(request, response, next) {
    try {
      console.log('i am in the history controller step 1');
      const { id: userId } = request.params;
      const user = await this._userService.getById(userId);
      console.log(user, user.id, 'in histroy controller');
      const history = await this._entityService.findByUserId(
        user.id,
        request.authenticatedUserId
      );
      console.log(history, 'this is the history');
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
module.exports = HistoryController;

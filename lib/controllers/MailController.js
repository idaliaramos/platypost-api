const EntityController = require('./EntityController');

class MailController extends EntityController {
  constructor({ mailService, userService }) {
    super({
      entityName: 'Mail',
      entityService: mailService
    });
    this._userService = userService;
    // this._bindMethods(['createForUser', 'findByUserId']);
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
}
module.exports = MailController;

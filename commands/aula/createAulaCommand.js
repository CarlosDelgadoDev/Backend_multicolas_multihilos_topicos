const BaseCommand = require('../baseCommand');
const { Aula } = require('../../models');

class CreateAulaCommand extends BaseCommand {
  async execute() {
    const aula = await Aula.create(this.data);
    return { success: true, aula };
  }
}

module.exports = CreateAulaCommand;

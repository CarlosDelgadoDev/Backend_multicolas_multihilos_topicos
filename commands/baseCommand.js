class BaseCommand {
  constructor(data) {
    this.data = data;
  }
  
  async execute() {
    throw new Error('Execute method must be implemented');
  }
  
  async handleError(error) {
    console.error(`Fallo el comando: ${this.constructor.name}`, error);
    throw error;
  }
}

module.exports = BaseCommand;
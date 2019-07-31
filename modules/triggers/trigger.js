class Trigger {
    constructor(args) {
        this._id = args._id
        this.instruction = this.validateInstruction(args.instruction)
    }

    validateInstruction(instruction) {
        let RegExp //TODO: добавить регулярное выражение
        (instruction.serch(new RegExp(regText, "g")) !== -1) ? this.instruction = instruction
            : throw new Error("bad instruction")
    }

    check(data) {

    }
}

module.exports = Trigger
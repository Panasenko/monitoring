class Trigger {
    constructor(args) {
        this._id = args._id
        this.name = args.name
        this.disaster = this.initInstruction(`date(from, before)`)
        this.high = null//eval(`1 === 1`)
        this.average = eval(`1 !== 1`)
        this.warning = eval(`1 !== 1`)
        this.information = eval(`1 !== 1`)
    }
/*
    validateInstruction(instruction) {
        let RegExp = //
        (instruction.serch(new RegExp(regText, "g")) !== -1) ? this.instruction = instruction
            : throw new Error("bad instruction")
    }*/



    initInstruction(instruction){

        return new Function(`{from, before}, date`, `return ${instruction}`)

    }

    date(a,b){
        console.log("date")
       return a === b
    }

    check(data) {

        let sclock = data.from
        let andclock = data.before
        let date = this.date

        let methods = [
            date
        ]

        switch (true) {
            case this.disaster(data, ...methods):
                console.log("disaster")
                break
            case this.high:
                console.log("high")
                break
            case this.average:
                console.log("average")
                break
            case this.warning:
                console.log("warning")
                break
            case this.information:
                console.log("information")
                break
            default: console.log("none")
        }
    }
}

let obj = new Trigger({name: "test", _id: "1111111111111"})
let data = {
    from : 1,
    before: 1
}
obj.check(data)
class Errors {

   static valid(value, massage) {
        switch (value) {
            case (value === null):
                throw new Error(massage)
                break
            case (value === undefined):
                throw new Error(massage)
                break
        }
    }
}

module.exports = Errors
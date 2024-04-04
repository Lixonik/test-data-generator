import TestUtils from './src/test-utils'

//console.log(TestUtils.createUUID(false))
//console.log(TestUtils.createUUID(false))
//console.log(TestUtils.createUUID(false))

const string = () => TestUtils.generateUUID(true)
const weak = () => TestUtils.generateUUID(false)

//TestUtils.comparePerformance(
//    string, weak
//)


//console.log(TestUtils.generateMeaningfulString(50, ' '))

//for (let i = 0; i < 4195; i++) {
//    console.log(TestUtils.generateUUID())
//}

console.log(TestUtils.generatePerson())

console.log(TestUtils.generatePerson({

}))

console.log(TestUtils.generatePerson({
    language: 'ru'
}))


console.log(TestUtils.generateRandomString({
}))

console.log(TestUtils.generateRandomNumber({
}))
import { generatePerson, generateRandomNumber, generateRandomString, generateUUID } from './src'

const string = () => generateUUID(true)
const weak = () => generateUUID(false)

//TestUtils.comparePerformance(
//    string, weak
//)


//console.log(TestUtils.generateMeaningfulString(50, ' '))

//for (let i = 0; i < 4195; i++) {
//    console.log(TestUtils.generateUUID())
//}

console.log(generatePerson())

console.log(generatePerson({

}))

console.log(generatePerson({
    language: 'ru'
}))


console.log(generateRandomString({
}))

console.log(generateRandomNumber({
}))
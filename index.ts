import TestUtils from './src/TestUtils'

//console.log(TestUtils.createUUID(false))
//console.log(TestUtils.createUUID(false))
//console.log(TestUtils.createUUID(false))

const string = () => TestUtils.generateUUID(true)
const weak = () => TestUtils.generateUUID(false)

//TestUtils.comparePerformance(
//    string, weak
//)


console.log(TestUtils.generateMeaningfulString(50, ', '))
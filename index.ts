import TestUtils from './src/TestUtils'

//console.log(TestUtils.createUUID(false))
//console.log(TestUtils.createUUID(false))
//console.log(TestUtils.createUUID(false))

const string = () => TestUtils.createUUID(true)
const weak = () => TestUtils.createUUID(false)

TestUtils.comparePerformance(
    string, weak
)

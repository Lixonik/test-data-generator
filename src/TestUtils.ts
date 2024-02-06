import { randomUUID as nativeGenerator, UUID } from 'node:crypto'
import { arrayToUUID, randomArray16bytes, shuffleArray } from './utils'
import { CashedValues } from './types'

export default class TestUtils {
    private static cashed: CashedValues = {
        array: randomArray16bytes()
    }

    static createUUID(strictRandom: boolean = false): UUID {
        if (strictRandom) return nativeGenerator()

        TestUtils.shuffleCashedArray()

        return TestUtils.generateUUIDFromCashedArray()
    }

    private static generateUUIDFromCashedArray(): UUID {
        const randomArray = TestUtils.cashed.array ?? randomArray16bytes()

        // set bits for v4 and `clock_seq_hi_and_reserved`
        randomArray[6] = (randomArray[6] & 0x0f) | 0x40
        randomArray[8] = (randomArray[8] & 0x3f) | 0x80

        return arrayToUUID(randomArray)
    }

    private static shuffleCashedArray() {
        shuffleArray(TestUtils.cashed.array)
    }
}

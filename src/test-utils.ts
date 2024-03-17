import { v4 as uuidGenerator } from 'uuid'
import {
    arrayToUUID,
    generatePreparedRusTrie,
    generatePreparedTrie,
    randomArray16bytes,
    shuffleUint8Array,
} from './utils'
import { CashedValues, UUID } from './types'

export default class TestUtils {
    private static cashedArrayForUUID = randomArray16bytes()
    private static tries = {
        rus: generatePreparedRusTrie(),
        en: generatePreparedTrie(),
    }

    static comparePerformance(...functions: Function[]) {
        functions.forEach(fn => TestUtils.measurePerformance(fn))
    }


    /**
     * 1) макс дисперсия, мин дисперсия
     * 2) ? указание дельт
     * 3) на каждой итерации создавать rnd hash value, чтобы заставлять движок выполнять эту операцию (не оптимизировать)
     *
     * @return ComparedResult
     * @param fn
     * @param loopCount
     * @private
     */
    private static measurePerformance(fn: Function, loopCount?: 1000 | 5000 | 10_000, dispersionLoop?: 10 | 50 | 100 ): ComparedResult {
        const count = loopCount ?? 1000

        let all = []
        let hash = 0

        // outer loop = dispersionLoop
        for (let i = 0; i < count; i++) {
            hash += Math.random()
            performance.mark(`start ${fn.name}`)
            fn()
            performance.mark(`end ${fn.name}`)
            performance.measure(`${fn.name}`, `start ${fn.name}`, `end ${fn.name}`)
            all.push(performance.getEntriesByName(`${fn.name}`)[0].duration)
        }

        console.log('Measurement hash = ', hash)
        console.log(`${fn.name}: avg ${count} loops = ${all.reduce((acc, v) => acc + v, 0) / all.length} ms`)
    }

    static generateUUID(strictRandom: boolean = false): UUID {
        if (strictRandom) return uuidGenerator() as UUID

        TestUtils.shuffleCashedArray()

        return TestUtils.generateUUIDFromCashedArray()
    }


    /**
     * 4752bddc-eeae-43a2-bf6b-07b4bd734b48
     * @example 4751ffff-ffff-ffff-ffff-ffffffff
     * create counter отвечающий за 1й блок uuid
     *
     * @private
     */
    private static generateUUIDFromCashedArray(): UUID {
        const randomArray = TestUtils.cashedArrayForUUID ?? randomArray16bytes()

        // set bits for v4 and `clock_seq_hi_and_reserved`
        randomArray[6] = (randomArray[6] & 0x0f) | 0x40
        randomArray[8] = (randomArray[8] & 0x3f) | 0x80

        return arrayToUUID(randomArray)
    }

    private static shuffleCashedArray() {
        shuffleUint8Array(TestUtils.cashedArrayForUUID)
    }

    static generateMeaningfulString(length: number, separator?: string): string {
        return this.tries.en.getRandomFullString(length, separator)
    }

    static generateMeaningfulRusString(length: number, separator?: string): string {
        return this.tries.rus.getRandomFullString(length, separator)
    }

    /**
     * opts = { gender, middle,  }
     */


    static generateFIO() {

    }

}

/**
 * length = 'extra-larger depends on last name
 */
type PartNameOpts = {
    length: 'small' | 'medium' | 'large' | 'extra-large'
    gender: 'male' | 'female'
    type: 'name' | 'surname' | 'patronymic'
}


type StringOpts = {
    charSet: string[] // char set
    length: number
}

type NumberOpts = {
    min: number
    max: number
}

type ComparedResult = {
    averageOpSpeed: number
    hash: number
    functionName: string
    // 1) median, mode, (?) minDispersion, maxDispersion
    // 2) (?) measurementError (погрешность абсолютная/относительная)
}
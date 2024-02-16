import crypto from 'crypto'
import { UUID } from 'node:crypto'

export const randomArray16bytes = (): Uint8Array => {
    const rnd8Pool = new Uint8Array(256)
    crypto.randomFillSync(rnd8Pool)

    return rnd8Pool.slice(0, 16)
}

const byteToHex: string[] = []

for (let i = 0; i < 256; ++i) {
    byteToHex.push((i + 0x100).toString(16).slice(1))
}

/**
 *
 * @param array
 */
export const arrayToUUID = (array: Uint8Array): UUID => (
    byteToHex[array[0]] +
    byteToHex[array[1]] +
    byteToHex[array[2]] +
    byteToHex[array[3]] +
    '-' +
    byteToHex[array[4]] +
    byteToHex[array[5]] +
    '-' +
    byteToHex[array[6]] +
    byteToHex[array[7]] +
    '-' +
    byteToHex[array[8]] +
    byteToHex[array[9]] +
    '-' +
    byteToHex[array[10]] +
    byteToHex[array[11]] +
    byteToHex[array[12]] +
    byteToHex[array[13]] +
    byteToHex[array[14]] +
    byteToHex[array[15]]
).toLowerCase() as UUID


/**
 * Fisher-Yates Sorting Algorithm
 * https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/
 * @param array
 */
export const shuffleArray = (array: Uint8Array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
}

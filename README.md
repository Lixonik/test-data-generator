# test-data-utils

## A robust and lightweight data generation library for automating the preparation of test data for frontend unit testing.

### Features

- Fastest UUID generation
- Numeric value generation within a specified range
- Random string generation with custom char set and requested lengths
- Person name generation with options for gender, type, length, and language
- Generation of meaningful strings based on a real of prefixes, words, and suffixes
- Support for English and Russian languages

### Documentation

#### *Functions*

The functionality of the library is implemented using the following functions available to the user:

1. `generateUUID(strinctRandom?: boolean)` -- the function is used to generate unique identifiers (UUID). In the case of
   non-strict randomisation, an end-to-end counter is used, converted into a hexadecimal number format string, which is
   then added to the base UUID. When a certain number is reached, the counter is reset.
2. `generateNumber(opts: Partial<NumberOpts>)` -- a function that returns a random number in a given interval between
   the minimum and maximum minimum and maximum. If the maximum is less than the minimum, an error is generated.
3. `generateString(opts: Partial<StringOpts>)` -- the function returns a string of random characters of the specified
   length from a user-defined character set or the default English alphabet. character set defined by the user or from
   the default English alphabet.
4. `generatePerson(opts?: Partial<PartNameOpts>)` -- the function generates a random first, last or patronymic name
   depending on the provided parameters such as length, gender and desired case (for Russian).
5. `generateMeaningfulString(opts?: Partial<MeaningfulStringOpts>)`-- based on the prefix trees (tries) for English and
   Russian languages, the function generates a random meaningful string of a given length, which may include the words
   or their combinations with delimiters.

#### *Types*

```ts
type NumberOpts = {
    min: number
    max: number
}
```

```ts
type StringOpts = {
    charSet: string[] | string
    length: number
}
```

```ts
type PartNameOpts = {
    gender: 'male' | 'female'
    type: 'name' | 'surname' | 'patronymic'
    length: 'small' | 'medium' | 'large' | 'extra_large'
    language: Language
    padej: Case
}
```

```ts
type MeaningfulStringOpts = {
    length: number
    separator: string
    language: Language
}
```

```ts
type Language = 'en' | 'ru'
```

```ts
type Case = 'nominative' | 'genitive' | 'dative' | 'accusative' | 'instrumental' | 'prepositional'
```

#### *Installation*

Via npm:

```sh
npm i -D test-data-utils
```

#### *import*

##### via ES6 `import`:

```ts
import {
    generateMeaningfulString,
    generateNumber,
    generatePerson,
    generateString,
    generateUUID
} from 'test-data-utils'
```

##### via ES5 `require()`:

```ts
const {
    generateMeaningfulString,
    generateNumber,
    generatePerson,
    generateString,
    generateUUID
} = require('test-data-utils')
```

#### *Usage example*

##### UUID Generation

```ts
import { generateUUID } from 'test-data-utils'


for (let i = 0; i < 1000; i++) {
    console.log(generateUUID())
}
```

```ts
/** Output:
 *  000f-ffff-ffff-ffff-ffffffffffff
 *  001f-ffff-ffff-ffff-ffffffffffff
 *  002f-ffff-ffff-ffff-ffffffffffff
 *  003f-ffff-ffff-ffff-ffffffffffff
 *  004f-ffff-ffff-ffff-ffffffffffff
 *  005f-ffff-ffff-ffff-ffffffffffff
 *  006f-ffff-ffff-ffff-ffffffffffff
 *  007f-ffff-ffff-ffff-ffffffffffff
 *  008f-ffff-ffff-ffff-ffffffffffff
 *  ...
 *  ...
 *  ...
 *  3dff-ffff-ffff-ffff-ffffffffffff
 *  3e0f-ffff-ffff-ffff-ffffffffffff
 *  3e1f-ffff-ffff-ffff-ffffffffffff
 *  3e2f-ffff-ffff-ffff-ffffffffffff
 *  3e3f-ffff-ffff-ffff-ffffffffffff
 *  3e4f-ffff-ffff-ffff-ffffffffffff
 *  3e5f-ffff-ffff-ffff-ffffffffffff
 *  3e6f-ffff-ffff-ffff-ffffffffffff
 *  3e7f-ffff-ffff-ffff-ffffffffffff
 */

```

##### Number Generation

```ts
import { generateNumber } from 'test-data-utils'


const stubNumberOpts = {
    min: 0,
    max: 100
}

console.log(generateNumber(stubNumberOpts))
```

```ts
// Output: 85
```

##### String Generation

```ts
import { generateString } from 'test-data-utils'


const stubStringOpts = {
    charSet: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    length: 1000
}

console.log(generateString(stubStringOpts))
```

```ts
// Output: 3fwTMjhxjcWddMBu4LDVaWeyxuBao2SNgcLJvL8flhJSNZyhFjriruPVLDSL45BHs29iXETmjCi86orscQBhPUBLCN0MVg0rgBqH8RDitLOqUPRE8i7jDaBA01V8xaiSsTGB3opgg80Xs8dMjsKpK09G2LWlmXnJjqacvgVoJI4H3hnbf3bfRm3US0PaaOEJLHMWtMnBt28NfNfhdGXY6cR34LqPJocJ1Fva1AWy5kPcecLXLIhRIT5HmlShZggJLrBwNSBOm5j6oEbalUT4SfQFwTaAv7KePEFkv8tmiRacP9V61bYDAtFFCKAJQlU2d5e59FAzX6XkTfjrKtlVBBrO576tcn3qXCWe1naElj2WG0Myk8tq8rft0L5rqGey5n3tQAmFWxmG5mMyS1UhpIAKrpsA58R3lrMpxvVdpia2bJGAGz8YfJa4zmyto9XgBADvQpRDNApggd9Twqt3ND5hvW8ibDzftZJzJYnRi8npAqoNDfd6hTZ2mbOogtJqJg4PduoaNPwE0KZm8RrOjUNUgIj5HaJ3CSQdmXgV68NzcIoXGaGaYvhP3MJY8Tg2ZVolJZiUvHN28hDjjRhLK6uIBFWEDAnOxQ1o0VFl1S6zsGEgYo5K7Vqq4oLg820fUdZe5j0QLA3Ffh7BgvGHL7uyG84mp8Uev4qtvFyBvL8ChQaBy1ThIkootGlSEZ6bvtfhXNjhkOSqfF8Lfpe3WvC6ImBYeJKYv1MtfjQsVCgZO7AkNC1FS0nYsCrbPc6r72HXmpONvR0hrE9lYAfVcZIv1YtDMrlpFR5MSLgZAOtIRjdJec9U64xG6qdgFyJkYbaaFPYpUpRzftWTFmm1V4paYYRj2Dk18sN8W7uVMdC5XMOv7L1e8D8GbavcWYqoGdSZeaUdsVXydTMYapHhMBuv1lEP8CADD6Ju7qz8iSr3OpoASVU1ig2f4JHhvPNEdhBjmv8z2oKoHyx2sbeUo0gDlxNopiYv8SVb2y9y
```

##### Person Generation

```ts
import { generatePerson } from 'test-data-utils'


const stubPartNameOpts = {
    gender: 'female',
    type: 'name',
    language: 'en'
} as const
const stubPartNameRuOpts = {
    gender: 'male',
    type: 'surname',
    language: 'ru'
} as const

console.log(generatePerson(stubPartNameOpts))
console.log(generatePerson(stubPartNameRuOpts))
```

```ts
/** Output:
 *  Olivia
 *  Соколов
 */
```

##### Meaningful String Generation

```ts
import { generateMeaningfulString } from 'test-data-utils'

const stubMeaningfulStringOpts = {
    length: 17,
    separator: ' ',
    language: 'en'
} as const
const stubMeaningfulRuStringOpts = {
    length: 30,
    separator: ' ',
    language: 'ru'
} as const

console.log(generateMeaningfulString(stubMeaningfulStringOpts))
console.log(generateMeaningfulString(stubMeaningfulRuStringOpts))
```

```ts
/** Output:
 *  trans transquince
 *  раз разт разтыква разтыквачик
 */
```
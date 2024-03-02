import * as fs from 'fs'

const text = fs.readFileSync('./src/rus/text.txt', { encoding: 'utf-8' })

const words = text
    .split('\n')
    .map(value => value.split(', '))
    .flat()
    .map(v => v.slice(0, v.indexOf('-')))

fs.writeFileSync('./src/rus/roots.json', JSON.stringify(words), { encoding: 'utf-8' })

import { userInfo } from 'os'

export const userGreeting = (): void => {
    console.log(`Hello, ${userInfo().username}`)
}

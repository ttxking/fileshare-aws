import { atomWithStorage } from 'jotai/utils'

const themeAtom = atomWithStorage('theme', 'dark')

export { themeAtom }

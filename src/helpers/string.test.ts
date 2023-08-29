import { describe, expect, test } from 'vitest'

import { countByCodePoint } from '~/helpers/string'

describe(countByCodePoint.name, () => {
  test.each([
    ['', 0],
    ['a', 1],
    ['あ', 1],
    ['風', 1],
    ['😀', 1],
    [String.fromCharCode(0x200b), 1], // Zero Width Space
    [String.fromCharCode(0x200d), 1], // Zero Width Joiner
  ])('"%s" length is %i', (chars, expected) => {
    const actual = countByCodePoint(chars)
    expect(actual).toBe(expected)
  })
})

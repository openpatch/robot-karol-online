export const questDeps: { [key: number]: number[] } = {
  1: [],
  2: [1],
  3: [2],
  4: [2],
  5: [3, 4],
  6: [1],
  7: [1],
  8: [2, 6],
  9: [7],
  10: [6, 7],
  11: [3],
  12: [4, 9],
  13: [5, 12],
  14: [5, 11],
  15: [11, 19],
  16: [9, 12, 17, 19],
  17: [18],
  18: [9, 12, 19],
  19: [9, 12],
}

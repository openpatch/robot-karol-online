import { deserlizeQuestToData } from '../commands/json'
import { QuestData } from '../state/types'

export const questData: { [key: number]: QuestData } = {
  1: {
    ...deserlizeQuestToData(require('./quests/1.json')),
  },

  2: {
    ...deserlizeQuestToData(require('./quests/2.json')),
  },

  3: {
    ...deserlizeQuestToData(require('./quests/3.json')),
    difficulty: 'Tutorial',
  },

  4: {
    title: 'Bedingte Wiederholung (+Anleitung)',
    description: `
      Du findest unter ... eine Schritt-für-Schritt Anleitung für diese Aufgabe.
    `,
    difficulty: 'Tutorial',
    tasks: [
      {
        title: 'Über den Berg',
        start: {
          dimX: 8,
          dimY: 3,
          height: 6,
          karol: { x: 7, y: 1, dir: 'west' },
          bricks: [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 2, 3, 2, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
          ],
          marks: [
            [false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false],
          ],
          blocks: [
            [false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false],
          ],
        },
        target: {
          dimX: 8,
          dimY: 3,
          height: 6,
          karol: { x: 6, y: 1, dir: 'west' },
          bricks: [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 2, 3, 2, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
          ],
          marks: [
            [false, false, false, false, false, false, false, false],
            [true, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false],
          ],
          blocks: [
            [false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false, false],
          ],
        },
      },
      {
        title: 'Lücke schließen',
        start: {
          dimX: 5,
          dimY: 5,
          height: 6,
          karol: { x: 2, y: 4, dir: 'north' },
          bricks: [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
          ],
          marks: [
            [true, true, false, true, true],
            [true, false, false, false, true],
            [true, false, false, false, true],
            [false, false, false, false, false],
            [false, false, false, false, false],
          ],
          blocks: [
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
          ],
        },
        target: {
          dimX: 5,
          dimY: 5,
          height: 6,
          karol: { x: 2, y: 4, dir: 'north' },
          bricks: [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
          ],
          marks: [
            [true, true, true, true, true],
            [true, false, false, false, true],
            [true, false, false, false, true],
            [false, false, false, false, false],
            [false, false, false, false, false],
          ],
          blocks: [
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
            [false, false, false, false, false],
          ],
        },
      },
    ],
  },

  5: {
    ...deserlizeQuestToData(require('./quests/5.json')),
  },

  6: {
    ...deserlizeQuestToData(require('./quests/6.json')),
  },

  7: {
    ...deserlizeQuestToData(require('./quests/7.json')),
  },

  8: {
    ...deserlizeQuestToData(require('./quests/8.json')),
  },

  9: {
    ...deserlizeQuestToData(require('./quests/9.json')),
  },

  10: {
    ...deserlizeQuestToData(require('./quests/10.json')),
  },

  11: {
    ...deserlizeQuestToData(require('./quests/11.json')),
  },

  12: {
    ...deserlizeQuestToData(require('./quests/12.json')),
  },

  13: {
    ...deserlizeQuestToData(require('./quests/13.json')),
  },

  14: {
    ...deserlizeQuestToData(require('./quests/14.json')),
  },

  15: {
    ...deserlizeQuestToData(require('./quests/15.json')),
  },

  16: {
    ...deserlizeQuestToData(require('./quests/16.json')),
  },

  17: {
    ...deserlizeQuestToData(require('./quests/17.json')),
  },

  18: {
    ...deserlizeQuestToData(require('./quests/18.json')),
  },

  19: {
    ...deserlizeQuestToData(require('./quests/19.json')),
  },

  20: {
    ...deserlizeQuestToData(require('./quests/20.json')),
  },

  21: {
    ...deserlizeQuestToData(require('./quests/21.json')),
  },

  22: {
    ...deserlizeQuestToData(require('./quests/22.json')),
  },

  23: {
    ...deserlizeQuestToData(require('./quests/23.json')),
  },

  24: {
    ...deserlizeQuestToData(require('./quests/24.json')),
  },

  25: {
    ...deserlizeQuestToData(require('./quests/25.json')),
  },

  26: {
    ...deserlizeQuestToData(require('./quests/26.json')),
  },
}

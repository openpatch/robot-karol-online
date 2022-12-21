import { QuestData } from '../state/types'

export const questData: { [key: number]: QuestData } = {
  1: {
    title: 'Herzlich Willkommen',
    description: `
      Karol ist ein kleiner Roboter, der in der Bildschirmwelt lebt.
      Du kannst ihn steuern, indem du links im Block-Editor ein Programm schreibst.
      Dieses Programm soll dann den ersten Auftrag erfüllen. Lege in diesem Fall ein drei Ziegel.
    `,
    difficulty: 'Tutorial',
    tasks: [
      {
        title: 'Ziegelsteine legen',
        start: {
          dimX: 7,
          dimY: 1,
          height: 6,
          karol: { x: 0, y: 0, dir: 'east' },
          bricks: [[0, 0, 0, 0, 0, 0, 0]],
          marks: [[false, false, false, false, false, false, false]],
          blocks: [[false, false, false, false, false, false, false]],
        },
        target: {
          dimX: 7,
          dimY: 1,
          height: 6,
          karol: { x: 0, y: 0, dir: 'east' },
          bricks: [[0, 1, 0, 1, 0, 1, 0]],
          marks: [[false, false, false, false, false, false, false]],
          blocks: [[false, false, false, false, false, false, false]],
        },
      },
    ],
  },

  2: {
    title: 'Erstes Bauprojekt',
    description:
      'Hallo, das ist eine Quest von Robot Karol. Es geht darum, ein Programm zu schreiben, ' +
      'das in der Lage ist, alle Aufträge zu erfüllen. Erstelle dazu im Block-Editor dein Programm und starte es.',
    difficulty: 'Tutorial',
    tasks: [
      {
        title: 'Auftrag 1: Ziegelquadrat',
        start: {
          dimX: 6,
          dimY: 6,
          height: 6,
          karol: { x: 0, y: 0, dir: 'south' },
          bricks: [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
          ],
          marks: [
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
          ],
          blocks: [
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
          ],
        },
        target: {
          dimX: 6,
          dimY: 6,
          height: 6,
          karol: { x: 0, y: 0, dir: 'south' },
          bricks: [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
          ],
          marks: [
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
          ],
          blocks: [
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
          ],
        },
      },
      {
        title: 'Auftrag 2: Fülle die Mitte',
        start: {
          dimX: 6,
          dimY: 6,
          height: 6,
          karol: { x: 5, y: 5, dir: 'north' },
          bricks: [
            [1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 1, 1],
            [1, 1, 0, 0, 1, 1],
            [1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1],
          ],
          marks: [
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
          ],
          blocks: [
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
          ],
        },
        target: {
          dimX: 6,
          dimY: 6,
          height: 6,
          karol: { x: 0, y: 0, dir: 'south' },
          bricks: [
            [1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1],
          ],
          marks: [
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
          ],
          blocks: [
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
          ],
        },
      },
      {
        title: 'Auftrag 3: Zwischen den Säulen',
        start: {
          dimX: 6,
          dimY: 6,
          height: 6,
          karol: { x: 5, y: 0, dir: 'west' },
          bricks: [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
          ],
          marks: [
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
          ],
          blocks: [
            [false, false, false, false, false, false],
            [false, true, false, false, true, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, true, false, false, true, false],
            [false, false, false, false, false, false],
          ],
        },
        target: {
          dimX: 6,
          dimY: 6,
          height: 6,
          karol: { x: 0, y: 0, dir: 'south' },
          bricks: [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
          ],
          marks: [
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
          ],
          blocks: [
            [false, false, false, false, false, false],
            [false, true, false, false, true, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, true, false, false, true, false],
            [false, false, false, false, false, false],
          ],
        },
      },
    ],
  },

  3: {
    title: 'Fließenleger',
    description: '123',
    difficulty: 'Dummy',
    tasks: [
      {
        title: 'leer',
        start: {
          dimX: 1,
          dimY: 1,
          height: 1,
          karol: { x: 0, y: 0, dir: 'east' },
          bricks: [[0]],
          marks: [[false]],
          blocks: [[false]],
        },
        target: null,
      },
    ],
  },

  4: {
    title: 'Noch eine Quest',
    description: '123',
    difficulty: 'Dummy',
    tasks: [
      {
        title: 'leer',
        start: {
          dimX: 1,
          dimY: 1,
          height: 1,
          karol: { x: 0, y: 0, dir: 'east' },
          bricks: [[0]],
          marks: [[false]],
          blocks: [[false]],
        },
        target: null,
      },
    ],
  },

  5: {
    title: 'Und noch eine Quest',
    description: '123',
    difficulty: 'Dummy',
    tasks: [
      {
        title: 'leer',
        start: {
          dimX: 1,
          dimY: 1,
          height: 1,
          karol: { x: 0, y: 0, dir: 'east' },
          bricks: [[0]],
          marks: [[false]],
          blocks: [[false]],
        },
        target: null,
      },
    ],
  },

  6: {
    title: 'Schön mal die Breite checken',
    description: '123',
    difficulty: 'Dummy',
    tasks: [
      {
        title: 'leer',
        start: {
          dimX: 1,
          dimY: 1,
          height: 1,
          karol: { x: 0, y: 0, dir: 'east' },
          bricks: [[0]],
          marks: [[false]],
          blocks: [[false]],
        },
        target: null,
      },
    ],
  },
}
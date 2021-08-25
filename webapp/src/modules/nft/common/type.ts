

// export enum CommonRarity {

//   LEGENDARY = 'legendary',
//   EPIC = 'epic',
//   RARE = 'rare',
//   UNCOMMON = 'uncommon',
//   COMMON = 'common'
// }

export const CommonRarity =

  [
    'dummy',
    'common',
    'uncommon',
    'rare',
    'epic',
    'legendary',

  ]


// export const RARITY_COLOR = {

//   [CommonRarity.LEGENDARY]: '#FF8C00',
//   [CommonRarity.EPIC]: '#9400D3',
//   [CommonRarity.RARE]: '#00FFFF',
//   [CommonRarity.UNCOMMON]: '#00FA9A',
//   [CommonRarity.COMMON]: '#C0C0C0'
// }

export const RARITY_COLOR = [
  "#ffffff",
  '#C0C0C0',
  '#00FA9A',
  '#00FFFF',
  '#9400D3',

  '#FF8C00'
]

export type Common = {
  description: string

  rarity: typeof CommonRarity
}



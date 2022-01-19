export type Tower = {
  description: string,
  rarity: number
}

export type TowerStats = {
  Attack: string,
  AttactSpeed: string,
  AttackRange: string,
  Durability: string
}

export type TowerDetail = {
  ID: number,
  P1: TowerPart,
  P2: TowerPart,
  P3: TowerPart,
  P4: TowerPart
}

export type TowerPart = {
  Level: number,
  Rarity: number
}
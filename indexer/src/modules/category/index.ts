import { log } from '@graphprotocol/graph-ts'
import * as categories from './categories'
import * as addresses from '../../data/addresses'

export function getCategory(contractAddress: string): string {
  let category = ''

  if (contractAddress == addresses.Asset) {
    category = categories.ASSET
  }
  // else if (contractAddress == addresses.EstateRegistry) {
  //   category = categories.ESTATE
  // } else if (contractAddress == addresses.Boardingpass) {
  //   category = categories.BOARDINGPASS
  // }
  // else if (contractAddress == addresses.DCLRegistrar) {
  //   category = categories.ENS
  // } else if (
  //   contractAddress == addresses.BinanceUsCollection ||
  //   contractAddress == addresses.ChinaFlying ||
  //   contractAddress == addresses.CommunityContestCollection ||
  //   contractAddress == addresses.DappcraftMoonminerCollection ||
  //   contractAddress == addresses.DCGCollection ||
  //   contractAddress == addresses.DCLLaunchCollection ||
  //   contractAddress == addresses.DGSummer2020Collection ||
  //   contractAddress == addresses.DgtbleHeadspaceCollection ||
  //   contractAddress == addresses.ExclusiveMasksCollection ||
  //   contractAddress == addresses.Halloween2019Collection ||
  //   contractAddress == addresses.Halloween2020Collection ||
  //   contractAddress == addresses.MCHCollection ||
  //   contractAddress == addresses.Moonshot2020Collection ||
  //   contractAddress == addresses.PMOuttathisworldCollection ||
  //   contractAddress == addresses.StaySafeCollection ||
  //   contractAddress == addresses.WonderzoneMeteorchaserCollection ||
  //   contractAddress == addresses.Xmas2019Collection ||
  //   contractAddress == addresses.CybermikeCyberSoldier ||
  //   contractAddress == addresses.CZMercenaryMTZ ||
  //   contractAddress == addresses.DCMeta ||
  //   contractAddress == addresses.DCNiftyblocksmith ||
  //   contractAddress == addresses.DGFall2020 ||
  //   contractAddress == addresses.DigitalAlchemy ||
  //   contractAddress == addresses.EtheremonWearables ||
  //   contractAddress == addresses.MFSammichgamer ||
  //   contractAddress == addresses.MLPekingopera ||
  //   contractAddress == addresses.PMDreamverseEminence ||
  //   contractAddress == addresses.SugarclubYumi ||
  //   contractAddress == addresses.TechTribalMarc0matic ||
  //   contractAddress == addresses.WonderzoneSteampunk ||
  //   contractAddress == addresses.WZWonderbot ||
  //   contractAddress == addresses.Xmas2020Collection ||
  //   contractAddress == addresses.XmashUp2020 ||
  //   contractAddress == addresses.ReleaseTheKraken ||
  //   contractAddress == addresses.MemeDontBuyThis ||
  //   contractAddress == addresses.ThreeLAUBasics ||
  //   contractAddress == addresses.MLLiondance ||
  //   contractAddress == addresses.AtariLaunch ||
  //   contractAddress == addresses.RTFKTXAtari ||
  //   contractAddress == addresses.RACBasics ||
  //   contractAddress == addresses.WinklevossCapital ||
  //   contractAddress == addresses.DGAtariDillonFrancis
  // ) {
  //   category = categories.WEARABLE
  // } else if (contractAddress == addresses.Boardingpass) {
  //   category = categories.BOARDINGPASS
  // }
  else {
    log.warning('Contract address {} not being monitored', [contractAddress])
    category = contractAddress
  }

  return category
}


export function getCategoryByIndex(index: i32): string {
  let category = 'dummy'
  switch (index) {
    case 2:
      category = categories.BOARDINGPASS
      break;
    case 3:
      category = categories.LAND
      break;
    case 4:
      category = categories.BUILDING
      break;
    case 5:
      category = categories.TOWER
      break;
    case 6:
      category = categories.TRAP
      break;
    default:
      break;
  }
  return category
}


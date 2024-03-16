import {
  byeongHunAn,
  cameronSmith,
  dustinJohnson,
  jonRahm,
  mattFitzpatrick,
  matthewJordan,
  padraigHarrington,
  rickieFowler,
  roryMcilroy,
  scottieScheffler,
  seamusPower,
  shaneLowry,
  siWooKim,
  tommyFleetwood,
  viktorHovland
} from '../pgaTourPlayers.js'
import {
  aidanWalsh,
  aimeeOhanlon,
  cameronFolens,
  ciaranTighe,
  davidHynes,
  johnHannaway,
  phelimOconnor,
  richByrne,
  robKeartland,
  stephenDevine
} from '../puttingPalsPlayers.js'

export const theOpenChampionship2023 = {
  id: 'R2023100',
  seasonId: '2023',
  name: 'The Open Championship',
  players: [
    {
      ...stephenDevine,
      picks: [roryMcilroy, mattFitzpatrick, siWooKim]
    },
    {
      ...aimeeOhanlon,
      picks: [roryMcilroy, shaneLowry, siWooKim]
    },
    {
      ...aidanWalsh,
      picks: [scottieScheffler, rickieFowler, padraigHarrington]
    },
    {
      ...phelimOconnor,
      picks: [scottieScheffler, tommyFleetwood, byeongHunAn]
    },
    {
      ...davidHynes,
      picks: [padraigHarrington, rickieFowler, tommyFleetwood]
    },
    {
      ...robKeartland,
      picks: [seamusPower, roryMcilroy, scottieScheffler]
    },
    {
      ...richByrne,
      picks: [roryMcilroy, dustinJohnson, padraigHarrington]
    },
    {
      ...ciaranTighe,
      picks: [cameronSmith, rickieFowler, matthewJordan]
    },
    {
      ...johnHannaway,
      picks: [siWooKim, viktorHovland, jonRahm]
    },
    {
      ...cameronFolens,
      picks: [roryMcilroy, shaneLowry, padraigHarrington]
    }
  ]
}

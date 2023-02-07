import { IProfile } from './profile';
import { TrxStorage } from './TrxStorage';

export interface ISolution {
  to: string
  trxId: string
  id: string
  content: string
  userAddress: string
  timestamp?: number
  storage?: TrxStorage
  extra?: ISolutionExtra
}

export interface ISolutionExtra {
  profile?: IProfile
  liked?: boolean
  VoteCount: number
}
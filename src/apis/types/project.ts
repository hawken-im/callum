import { IProfile } from './profile';
import { TrxStorage } from './TrxStorage';

export interface IProject {
  trxId: string
  id: string
  content: string
  userAddress: string
  timestamp?: number
  storage?: TrxStorage
  extra?: IProjectExtra
}

export interface IProjectExtra {
  profile?: IProfile
  liked?: boolean
  likeCount: number
  commentCount: number
}
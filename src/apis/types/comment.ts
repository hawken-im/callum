import { IProfile } from './profile';
import { TrxStorage } from './TrxStorage';

export interface IComment {
  to: string
  trxId: string
  id: string
  content: string
  userAddress: string
  timestamp: number
  storage?: TrxStorage
  extra: ICommentExtra
}

export interface ICommentExtra {
  profile?: IProfile
  liked?: boolean
  likeCount: number
}
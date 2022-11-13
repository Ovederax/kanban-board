export type User = {
  id: number
  name: string
}

export type Comment = {
  id: number
  userId: number
  timestamp: string
  text: string
}

export type CardEntity = {
  id: number
  columnId: number
  text: string
  description: string
  comments: Comment[]
}

export type ColumnEntity = {
  id: number
  name: string
  cards: CardEntity[]
}

export interface DashboardEntity {
  name: string
  columns: ColumnEntity[]
}

export enum ActionType {
  ChangeCardText,
  AddNewCard,
  ChangeColumnName,
  ChangeCardContent,
  RemoveCard,
  AddCommentToCard,
  ChangeCommentText,
  RemoveComment,
}

export interface ChangeCardText {
  type: ActionType.ChangeCardText
  columnId: number
  cardId: number
  newText: string
}

export interface AddNewCard {
  type: ActionType.AddNewCard
  columnId: number
}

export interface ChangeColumnName {
  type: ActionType.ChangeColumnName
  columnId: number
  newColumnName: string
}

export interface ChangeCardContent {
  type: ActionType.ChangeCardContent
  columnId: number
  cardId: number
  newText: string
  newDescription: string
  newComments: Comment[]
}

export interface RemoveCard {
  type: ActionType.RemoveCard
  columnId: number
  cardId: number
}

export interface AddCommentToCard {
  type: ActionType.AddCommentToCard
  columnId: number
  cardId: number
  userId: number
  text: string
}

export interface ChangeCommentText {
  type: ActionType.ChangeCommentText
  columnId: number
  cardId: number
  commentId: number
  text: string
}

export interface RemoveComment {
  type: ActionType.RemoveComment
  columnId: number
  cardId: number
  commentId: number
}

export type Action =
  | ChangeCardText
  | AddNewCard
  | ChangeColumnName
  | ChangeCardContent
  | RemoveCard
  | AddCommentToCard
  | ChangeCommentText
  | RemoveComment

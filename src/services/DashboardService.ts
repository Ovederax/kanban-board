import {
  Action,
  ActionType,
  AddNewCard,
  ChangeCardText,
  ColumnEntity,
  DashboardEntity,
  CardEntity,
  ChangeColumnName,
  ChangeCardContent,
  RemoveCard,
  ChangeCommentText,
  RemoveComment,
  AddCommentToCard,
  Comment,
} from './types'
import { storage } from './localStorage'
import cardComment from '../modals/CardComment'
import { getLast } from '../utils'
import { Simulate } from 'react-dom/test-utils'
import timeUpdate = Simulate.timeUpdate

const processChangeCardText = (action: ChangeCardText, columns: ColumnEntity[]): ColumnEntity[] => {
  return columns.map(it => {
    if (it.id === action.columnId) {
      return {
        ...it,
        cards: it.cards.map(card => {
          if (card.id === action.cardId) {
            return {
              ...card,
              text: action.newText,
            }
          }
          return card
        }),
      }
    }
    return it
  })
}

const processChangeCardContent = (
  action: ChangeCardContent,
  columns: ColumnEntity[],
): ColumnEntity[] => {
  return columns.map(it => {
    if (it.id === action.columnId) {
      return {
        ...it,
        cards: it.cards.map(card => {
          if (card.id === action.cardId) {
            return {
              ...card,
              text: action.newText,
              description: action.newDescription,
              comments: action.newComments,
            }
          }
          return card
        }),
      }
    }
    return it
  })
}

const processRemoveCard = (action: RemoveCard, columns: ColumnEntity[]): ColumnEntity[] => {
  return columns.map(it => {
    if (it.id === action.columnId) {
      return {
        ...it,
        cards: it.cards.filter(card => {
          return card.id !== action.cardId
        }),
      }
    }
    return it
  })
}

const processChangeColumnName = (
  action: ChangeColumnName,
  columns: ColumnEntity[],
): ColumnEntity[] => {
  return columns.map(it => {
    if (it.id === action.columnId) {
      return {
        ...it,
        name: action.newColumnName,
      }
    }
    return it
  })
}

const processAddCard = (action: AddNewCard, columns: ColumnEntity[]): ColumnEntity[] => {
  return columns.map(it => {
    if (it.id === action.columnId) {
      const newCard: CardEntity = {
        id: (getLast(it.cards)?.id ?? -1) + 1,
        columnId: it.id,
        text: '',
        description: '',
        comments: [],
      }
      return {
        ...it,
        cards: it.cards.concat(newCard),
      }
    }
    return it
  })
}

const processAddComment = (action: AddCommentToCard, columns: ColumnEntity[]): ColumnEntity[] => {
  return columns.map(it => {
    if (it.id === action.columnId) {
      return {
        ...it,
        cards: it.cards.map(card => {
          if (card.id === action.cardId) {
            const newComment: Comment = {
              id: (getLast(card.comments)?.id ?? -1) + 1,
              userId: action.userId,
              text: action.text,
              timestamp: new Date().toISOString(),
            }

            return {
              ...card,
              comments: card.comments.concat(newComment),
            }
          }
          return card
        }),
      }
    }
    return it
  })
}

const processChangeComment = (
  action: ChangeCommentText,
  columns: ColumnEntity[],
): ColumnEntity[] => {
  return columns.map(it => {
    if (it.id === action.columnId) {
      return {
        ...it,
        cards: it.cards.map(card => {
          if (card.id === action.cardId) {
            return {
              ...card,
              comments: card.comments.map(it => {
                if (it.id === action.commentId) {
                  return {
                    ...it,
                    text: action.text,
                    timestamp: new Date().toISOString(),
                  }
                }
                return it
              }),
            }
          }
          return card
        }),
      }
    }
    return it
  })
}

const processRemoveComment = (action: RemoveComment, columns: ColumnEntity[]): ColumnEntity[] => {
  return columns.map(it => {
    if (it.id === action.columnId) {
      return {
        ...it,
        cards: it.cards.map(card => {
          if (card.id === action.cardId) {
            return {
              ...card,
              comments: card.comments.filter(it => {
                return it.id !== action.commentId
              }),
            }
          }
          return card
        }),
      }
    }
    return it
  })
}

const processAction = (action: Action, columns: ColumnEntity[]): ColumnEntity[] => {
  if (action.type === ActionType.ChangeCardText) {
    return processChangeCardText(action, columns)
  }
  if (action.type === ActionType.AddNewCard) {
    return processAddCard(action, columns)
  }
  if (action.type === ActionType.ChangeColumnName) {
    return processChangeColumnName(action, columns)
  }
  if (action.type === ActionType.ChangeCardContent) {
    return processChangeCardContent(action, columns)
  }
  if (action.type === ActionType.RemoveCard) {
    return processRemoveCard(action, columns)
  }
  if (action.type === ActionType.AddCommentToCard) {
    return processAddComment(action, columns)
  }
  if (action.type === ActionType.ChangeCommentText) {
    return processChangeComment(action, columns)
  }
  if (action.type === ActionType.RemoveComment) {
    return processRemoveComment(action, columns)
  }
  return columns
}

class DashboardService {
  getDashboard = () => {
    return storage.getDashboard()
  }
  processAction = (action: Action): DashboardEntity => {
    const dashboard = this.getDashboard()
    const newColumns = processAction(action, dashboard.columns)

    const newDashboard: DashboardEntity = {
      ...dashboard,
      columns: newColumns,
    }
    storage.saveDashboard(newDashboard)
    return newDashboard
  }
}

const dashboardService = new DashboardService()

export default dashboardService

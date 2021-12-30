import { gql } from '@apollo/client'

export const Login_User = gql`
  query LoginUser($email: String, $password: String) {
    loginUser(email: $email, password: $password) {
      status
      message
      data {
        id
        email
        name
        # password
        isVerified
      }
    }
  }
`

export const Get_Categories = gql`
  query Query {
    getCategories {
      status
      message
      data {
        id
        Image
        Title
        Description
        BackgroundColor
      }
    }
  }
`

export const Get_News = gql`
  query Query {
    getNews {
      status
      message
      data {
        id
        Image
        Title
        Tagline
        Description
        createdAt
        CategoryId
        CategoryName
      }
    }
  }
`

export const GET_FAV_NEWS_BY_ID = gql`
query GetFavoriteByUserId($userId: Int!) {
  getFavoriteByUserId(userId: $userId) {
    data {
      News {
      createdAt
      Description
      Tagline
      Title
      Image
      id
    }
    }
    status
    message
  }
}`

export const Get_Reports = gql`
  query Query {
    getReports {
      status
      message
      data {
        id
        userId
        CategoryId
        SubCategory
        latitude
        longitude
        Description
        SuspectName
        Category {
          BackgroundColor
        }
      }
    }
  }
`

export const FILTER_CATEGORIES = gql`
  query Query($showIds: [Int!]) {
    filterReports(showIds: $showIds) {
      status
      message
      data {
        id
        userId
        CategoryId
        latitude
        SubCategory
        longitude
        SuspectName
        IncidentDate
        CostMoney
        Description
        createdAt
        Category {
          BackgroundColor
        }
      }
    }
  }
`
export const FILTER_BY_DATE = gql`
query FilterReportsByDate($from: Date!, $to: Date!) {
  filterReportsByDate(from: $from, to: $to) {
    status
    message
    data {
      id
      userId
      SubCategory
      CategoryId
      longitude
      latitude
      IncidentDate
      IncidentTime
      SuspectName
      CostMoney
      floor
      Description
      createdAt
      Category {
        BackgroundColor
      }
    }
  }
}
`

import {
    gql
} from "@apollo/client";

export const GET_IDENTITY = gql`
query($Address:String!) {
    identity(address: $Address) {
    ens
    address
    domain
    social{
        twitter
    }
    avatar
    joinTime
    followerCount
    followingCount
    followings{
        pageInfo{
        startCursor
        endCursor
        hasPreviousPage
        hasNextPage
        }
        list{
            address
            domain
            ens
            avatar
            alias
            namespace
        }
    }
    followers{
        pageInfo{
        startCursor
        endCursor
        hasPreviousPage
        hasNextPage
        }
        list{
            address
            domain
            ens
            avatar
            alias
            namespace
        }
    }
    friends{
        pageInfo{
        startCursor
        endCursor
        hasPreviousPage
        hasNextPage
        }
        list{
            address
            domain
            ens
            avatar
            alias
            namespace
        }
    }
    }
}`;

export const GET_ID_DATA = gql`
query($Address:String!) {
    identity(address: $Address) {
    ens
    address
    domain
    social{
        twitter
    }
    avatar
    joinTime
    followerCount
    followingCount
    }
}`;

export const GET_FOLLOWERS = gql`
query($Address: String!, $After: String!){
  identity(address:$Address){
    followers(after:$After){
      pageInfo{
        endCursor
        startCursor
        hasPreviousPage
        hasNextPage
      }
      list{
        address
        domain
      }
    }
  }
}
`

export const GET_FOLLOWINGS = gql`
query($Address: String!, $After: String!){
  identity(address:$Address){
    followings(after:$After){
      pageInfo{
        endCursor
        startCursor
        hasPreviousPage
        hasNextPage
      }
      list{
        address
        domain
      }
    }
  }
}
`

export const GET_FEATURED = gql`
query{
  featured{
    address
    domain
    recommendationReason
    followerCount
    isFollowing
    avatar
  }
}
`
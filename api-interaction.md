---
description: CyberConnect GraphQL API
---

# API Interaction

This is a general overview of the application and how it interacts with the Cyberconnect GraphQL API and Ethers.js

#### View The Docs

{% embed url="https://docs.cyberconnect.me" %}

The CyberConnect API uses GraphQL and the Playground can be found here:

{% embed url="https://api.cybertino.io/connect/graphiql" %}

The data is retrieved from queries that can be found in query.js and can be tested in the playground.

```
// GET FOLLOWERS

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
```

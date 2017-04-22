import React from 'react'
import ReactDOM from 'react-dom'
import ListPage from './components/ListPage'
import CreateBookmark from './components/CreateBookmark'
import DetailPage from './components/DetailPage'
import { Router, Route, browserHistory } from 'react-router'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import 'tachyons'
// import './index.css'

const networkInterface = createNetworkInterface({ uri: process.env.REACT_APP_GRAPHQL_ENDPOINT })

const client = new ApolloClient({ networkInterface })

ReactDOM.render((
  <ApolloProvider client={client}>
    <Router history={browserHistory}>
      <Route path='/' component={ListPage}>
        <Route path='bookmark' component={CreateBookmark} />
        <Route path='bookmark/:id' component={DetailPage} />
      </Route>
    </Router>
  </ApolloProvider>
  ),
  document.getElementById('root')
)

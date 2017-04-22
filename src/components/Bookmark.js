import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import {Link} from 'react-router'

class Bookmark extends React.Component {

  static propTypes = {
    bookmark: React.PropTypes.object,
    mutate: React.PropTypes.func,
    refresh: React.PropTypes.func,
  }

  render () {
    return (
      <Link
        className='bg-white ma3 box bookmark flex flex-column no-underline br2'
        to={`${this.props.bookmark.url}`}
      >
        <img alt='' src={this.props.bookmark.imageURL} />
        <div className='flex items-center black-80 fw3 description'>
          {this.props.bookmark.description}
        </div>
        <span className='red f6 pointer dim' onClick={this.handleDelete}>Delete</span>
      </Link>
    )
  }

  handleDelete = async () => {
    await this.props.mutate({variables: {id: this.props.bookmark.id}})

    this.props.refresh()
  }
}

const deleteMutation = gql`
  mutation deleteBookmark($id: ID!) {
    deleteBookmark(id: $id) {
      id
    }
  }
`

const bookmarkWithMutation = graphql(deleteMutation)(Bookmark)

export default bookmarkWithMutation

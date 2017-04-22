import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Modal from 'react-modal'
import modalStyle from '../constants/modalStyle'
import {withRouter} from 'react-router'

const detailModalStyle = {
  overlay: modalStyle.overlay,
  content: {
    ...modalStyle.content,
    height: 761
  }
}

class DetailPage extends React.Component {

  static propTypes = {
    data: React.PropTypes.object,
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    const {Bookmark} = this.props.data

    return (
      <Modal
        isOpen
        contentLabel='Create Bookmark'
        style={detailModalStyle}
        onRequestClose={this.props.router.goBack}
      >
        <div className='close fixed right-0 top-0 pointer'>
          <img src={require('../assets/close.svg')} alt=''/>
        </div>
        <div
          className='delete ttu white pointer fw6 absolute left-0 top-0 br2'
          onClick={this.handleDelete}
        >
          Delete
        </div>
        <div className='bg-white detail flex flex-column no-underline br2 h-50'>
          <h2 className='flex items-center black-80 fw3'>
            {Bookmark.title}
          </h2>
          <img alt='Dodo' className='image' src={Bookmark.imageURL} />
          <div className='flex items-center black-80 fw3 description'>
            URL: {Bookmark.url}
            <br /> and Host: {Bookmark.host}
          </div>
          <div className='flex items-center black-80 fw3 description'>
            Description: {Bookmark.description}
          </div>
        </div>
      </Modal>
    )
  }

  handleDelete = async () => {
    await this.props.mutate({variables: {id: this.props.data.Bookmark.id}})

    this.props.router.push('/')
    this.props.data.refetch()
  }
}


const deleteMutation = gql`
  mutation deleteBookmark($id: ID!) {
    deleteBookmark(id: $id) {
      id
    }
  }
`

const BookmarkQuery = gql`query bookmark($id: ID!) {
  Bookmark(id: $id) {
    id
    url
    title
    host
    imageURL
    description
  }
}`

const DetailPageWithData = graphql(BookmarkQuery, {
  options: ({params}) => ({
    variables: {
      id: params.id
    }
  })
})(DetailPage)

const DetailPageWithDelete = graphql(deleteMutation)(DetailPageWithData)

export default withRouter(DetailPageWithDelete)

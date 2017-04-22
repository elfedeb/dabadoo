import React from 'react'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Modal from 'react-modal'
import modalStyle from '../constants/modalStyle'

class CreatePage extends React.Component {

  static propTypes = {
    router: React.PropTypes.object,
    addBookmark: React.PropTypes.func,
  }

  state = {
    description: '',
    justURL: '',
  }

  render () {
    return (
      <Modal
        isOpen
        contentLabel='Create Bookmark'
        style={modalStyle}
        onRequestClose={this.props.router.goBack}
      >
        <div className='pa4 flex justify-center bg-white'>
          <div style={{ maxWidth: 400 }} className=''>
            {this.state.justURL &&
              <img src={this.state.justURL} role='presentation' className='w-100 mv3' />
            }
            <input
              className='w-100 pa3 mv2'
              value={this.state.justURL}
              placeholder='Just the URL'
              onChange={(e) => this.setState({justURL: e.target.value})}
              autoFocus
            />
            { this.state.justURL &&
              <button className='pa3 bg-black-10 bn dim ttu pointer' onClick={this.handleBookmark}>Bookmark</button>
            }
          </div>
        </div>
      </Modal>
    )
  }

  handleBookmark = async () => {
    const justURL = this.state.justURL
    const description = 'This is the description for: ' + justURL
    await this.props.addBookmark({variables: { description, justURL }})

    window.location.pathname = '/'
  }
}

const addMutation = gql`
  mutation addBookmark($description: String!, $justURL: String!) {
    createBookmark(description: $description, justURL: $justURL) {
      id
      description
      justURL
    }
  }
`

const PageWithMutation = graphql(addMutation, { name: 'addBookmark' })(CreatePage)

export default withRouter(PageWithMutation)

import { connect } from 'react-redux';
import OriginalBoard from './components/billboard';
import { addTopic, queryTopics, upVote, downVote } from './actions/topicAction';

export const Billboard = connect(
  function mapStateToProps(state) {
    return {data: state}
  },
  function mapDispatchToProps(dispatch) {
    return {
    	addTopic: content => dispatch(addTopic(content)),
    	queryTopics: () => dispatch(queryTopics()),
    	upVote: id => dispatch(upVote(id)),
    	downVote: id => dispatch(downVote(id))
    }
  }
)(OriginalBoard);

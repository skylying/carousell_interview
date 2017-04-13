import $ from 'jquery';

export function addTopic(content) {
  var data = {'content': content}
  return dispatch => {
    //dispatch(setLoadingBookState()); // Show a loading spinner
    $.ajax({
      url: '/ajax/topic',
      type: 'POST',
      dataType : 'json',
      data: JSON.stringify(data),
      success: function(res) {
        if(res.code == 200) {
          dispatch(onTopicAdded(res.data.id, res.data.votes, res.data.content))
        }
      },
      error: function(error) {
        // TODO DISPATCH ERROR ACTION
        console.log(error);
      }
    })
  }
}

export function onTopicAdded(id, votes, content) {
  console.log(id, votes, content)
  return {
    type: 'TOPIC_ADDED',
    payload: {
      'id': id,
      'votes': votes,
      'content': content
    }
  };
}

export function queryTopics() {
  return dispatch => {
    //dispatch(setLoadingBookState()); // Show a loading spinner
    $.ajax({
      url: '/ajax/topic',
      type: 'GET',
      success: function(res) {
        if(res.code == 200) {
          console.log(res.data.topic_list);
          dispatch(onTopicReceived(res.data.topic_list))
        }
      },
      error: function(error) {
        // TODO DISPATCH ERROR ACTION
        console.log(error);
      }
    })
  }
}

export function onTopicReceived(topic_list) {
  return {
    type: 'TOPIC_RECEIVED',
    payload: {
      'topic_list': topic_list
    }
  };
}

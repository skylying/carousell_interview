import { List, Map } from 'immutable';

const defaultList = List([]);

export default function(list=defaultList, action) {
  switch(action.type) {
    case 'TOPIC_ADDED':
    	console.log("payload = " , action.payload);
    	var topic = {
    		'id': action.payload.id,
    		'votes': action.payload.votes,
    		'content': action.payload.content
    	}
      //[...list, topic]
      list.push(topic)
	    return [...list]
      break;
    case 'TOPIC_RECEIVED':
      return action.payload.topic_list
      break;
    case 'TOPIC_UPVOTED':
      var id = action.payload.id;
      var votes = action.payload.votes;
      list.map(function(t) {
        if(t.id == id) {
          return t.votes = votes;
        }
      })
      return [...list]
    case 'TOPIC_DOWNVOTED':
    var id = action.payload.id;
    var votes = action.payload.votes;
    list.map(function(t) {
      if(t.id == id) {
        return t.votes = votes;
      }
    })
    return [...list]
    default:
      return list;
  }
}

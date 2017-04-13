import { List, Map } from 'immutable';
import $ from 'jquery';

var topicList = List([]);

export default function(list=topicList, action) {
  switch(action.type) {
    case 'TOPIC_ADDED':
    	console.log("content = " , action.payload);
    	var topic = {
    		'id': action.payload.id,
    		'votes': action.payload.votes,
    		'content': action.payload.content
    	}
	    return [...list, topic]
      break;
    case 'TOPIC_RECEIVED':
      console.log("payload = " , action.payload);
      console.log(action.payload);
      return action.payload.topic_list
      break;
    default:
      return list;
  }
}

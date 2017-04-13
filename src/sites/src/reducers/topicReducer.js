import { List, Map } from 'immutable';

const defaultList = List([]);

export default function(list=defaultList, action) {
  console.log('[Reducer] Action Type :', action.type);
  console.log('[Reducer] Payload :', action.payload);
  switch(action.type) {
    case 'TOPIC_ADDED':
    	var topic = {
    		'id': action.payload.id,
    		'upvotes': action.payload.upvotes,
        'downvotes': action.payload.downvotes,
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
      var upvotes = action.payload.upvotes;
      list.map(function(t) {
        if(t.id == id) {
          return t.upvotes = upvotes;
        }
      })
      return [...list]
    case 'TOPIC_DOWNVOTED':
    var id = action.payload.id;
    var downvotes = action.payload.downvotes;
    list.map(function(t) {
      if(t.id == id) {
        return t.downvotes = downvotes;
      }
    })
    return [...list]
    default:
      return list;
  }
}

import { List, Map } from 'immutable';
import { Constants } from '../constants/constants'

const defaultData = {
  totalRows: 0,
  visibleRows: 0,
  topicList: []
};

export default function(data=defaultData, action) {
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
      data.topicList.push(topic)
	    return data
      break;
    case 'TOPIC_RECEIVED':
      // Calculate which to show / hide
      var count = 1;
      action.payload.topicList.map(function(t) {
        if (count > Constants.PAGE_LIMIT) {
          t.hideClass = 'hide'
        }
        count++;
      })
      return {
        visibleRows: Constants.PAGE_LIMIT,
        totalRows: action.payload.totalRows,
        topicList: action.payload.topicList
      }
      break;
    case 'TOPIC_UPVOTED':
      var id = action.payload.id;
      var upvotes = action.payload.upvotes;
      data.topicList.map(function(t) {
        if(t.id == id) {
          return t.upvotes = upvotes;
        }
      })
      return {
        visibleRows: data.visibleRows,
        totalRows: data.totalRows,
        topicList: data.topicList
      }
      break;
    case 'TOPIC_DOWNVOTED':
      var id = action.payload.id;
      var downvotes = action.payload.downvotes;
      data.topicList.map(function(t) {
        if(t.id == id) {
          return t.downvotes = downvotes;
        }
      })
      return {
        visibleRows: data.visibleRows,
        totalRows: data.totalRows,
        topicList: data.topicList
      }
    case 'TOGGLE_ALL':
      data.topicList.map(function(t) {
        return t.hideClass = '';
      })
      return {
        visibleRows: data.topicList.length,
        totalRows: data.totalRows,
        topicList: data.topicList
      }
      break;
    case 'TOGGLE_PARTIAL':
      var count = 1;
      data.topicList.map(function(t) {
        if (count > Constants.PAGE_LIMIT) {
          t.hideClass = 'hide'
        }
        count++;
      })
      return {
        visibleRows: Constants.PAGE_LIMIT,
        totalRows: data.totalRows,
        topicList: data.topicList
      }
      break;
    default:
      return data;
  }
}

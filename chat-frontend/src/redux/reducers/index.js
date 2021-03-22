import {combineReducers} from 'redux';

import dialogs from './dialogs';
import messages from './messages';
import user from './user';
import attachments from './attachments'

export default combineReducers({dialogs, messages, user, attachments});
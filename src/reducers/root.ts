import { combineReducers, Action } from 'redux';

export const rootReducer = combineReducers<any>({
  entities: (state: any = {}, action: Action) => state,
});

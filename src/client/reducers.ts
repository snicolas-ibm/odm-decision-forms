import {ActionTypes, DefaultAction, DisplayErrorAction, ReceiveResultAction, SetOptionsAction} from "./actions";
import {
	DecisionState, DecisionResult, DecisionError, DecisionNotRun, DecisionStatus, Options, DateFormat
} from "./state";

export const emptyReducer = (state = {}) => state;

export const responseReducer = (state: DecisionState = {status: DecisionStatus.NotRun},
																action: ReceiveResultAction | DisplayErrorAction | DefaultAction): DecisionState => {
	switch (action.type) {
		case ActionTypes.RECEIVE_RESULT:
			return {
				status: DecisionStatus.Result,
				result: action.payload,
				start: action.startDate,
				end: action.endDate
			};
		case ActionTypes.DISPLAY_ERROR:
			return {
				status: DecisionStatus.Error,
				error: {title: action.title, status: action.status, message: action.message},
				start: action.executionStart
			};
		default:
			return state;
	}
};

export const optionsReducer = (state: Options = {liveValidation: true, dateFormat: DateFormat.Widget},
															 action: SetOptionsAction | DefaultAction): Options => {
	switch (action.type) {
		case ActionTypes.SET_OPTIONS:
			return {...action.options};
		default:
			return state;
	}
};

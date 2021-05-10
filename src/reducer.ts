import Actions from './actions';
import {
  CharmType,
  FileList,
  SnackbarInfo,
  VideoType,
} from './Types';

interface State {
  files: FileList[];
  step: number;
  type: VideoType;
  charms: CharmType[];
  snackbar: SnackbarInfo;
}

interface Snackbar {
  type: Actions['SNACKBAR'];
  payload: SnackbarInfo;
}

interface NextStep {
  type: Actions['NEXT_STEP'];
}

interface PrevStep {
  type: Actions['PREV_STEP'];
}

interface SetFiles {
  type: Actions['SET_FILES'];
  payload: FileList[];
}

interface SetType {
  type: Actions['SET_TYPE'];
  payload: VideoType;
}

interface Upload {
  type: Actions['UPLOAD'];
}

interface SetCharmInfo {
  type: Actions['SET_CHARM_INFO'];
  payload: CharmType[];
}

interface Reset {
  type: Actions['RESET'];
}

type Action =
  | Snackbar
  | NextStep
  | PrevStep
  | SetFiles
  | SetType
  | Upload
  | SetCharmInfo
  | Reset;

const initialState: State = {
  files: [],
  step: 0,
  type: 'renkin',
  charms: [],
  snackbar: null,
};

const reducer = (state: State, action: Action) => {
  console.log(action);
  switch (action.type) {
    case 'SNACKBAR':
      return {
        ...state,
        snackbar: action.payload,
      }
    case 'NEXT_STEP':
      return {
        ...state,
        step: state.step + 1,
      }
    case 'PREV_STEP':
      return {
        ...state,
        files: state.step <= 2? [] : state.files,
        charms: state.step <= 5? [] : state.charms,
        step: state.step - 1,
      };
    case 'SET_FILES':
      return {
        ...state,
        files: action.payload,
      };
    case 'SET_TYPE':
      return {
        ...state,
        type: action.payload,
      };
    case 'UPLOAD':
      return {
        ...state,
        step: state.step + 1,
      };
    case 'SET_CHARM_INFO':
      return {
        ...state,
        charms: action.payload,
      };
    case 'RESET':
      const allow = ['snackbar'];
      return {
        ...initialState,
        ...Object.keys(state)
          .filter((key) => allow.includes(key))
          .reduce((obj: any, key) => {
            obj[key] = state[key as keyof State];
            return obj;
          }, {})
      };
    default:
      return state;
  }
};

export { initialState, reducer };
export type { Action };

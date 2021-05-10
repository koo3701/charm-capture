export type FileList = {
  file: File;
  src: string;
};

export type VideoType = 'renkin' | 'box';

export type CharmType = {
  'skill': [
    {
      'name': string,
      'level': string,
    },
    {
      'name': string,
      'level': string,
    },
  ],
  'slot': [
    string,
    string,
    string,
  ],
};

export type SnackbarInfo = {
  text: string,
  type: 'success' | 'info' | 'warning' | 'error' | 'default',
} | null;
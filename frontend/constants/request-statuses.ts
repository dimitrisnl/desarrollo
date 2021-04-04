export const ERROR = 'ERROR';
export const IDLE = 'IDLE';
export const LOADING = 'LOADING';
export const SUCCESS = 'SUCCESS';

export type STATUS =
  | typeof ERROR
  | typeof IDLE
  | typeof LOADING
  | typeof SUCCESS;

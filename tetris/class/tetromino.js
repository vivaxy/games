/**
 * @since 2019-09-25 08:18
 * @author vivaxy
 * TODO: implement render
 */
import StateMachine from './state-machine.js';
import * as TS from '../enums/tetromino-state.js';

export default class Tetromino {
  constructor() {
    this.state = new StateMachine({
      default: TS.SETTLED,
      create: [TS.SETTLED, TS.MOVING],
      drop: [TS.MOVING, TS.DROPPING],
      settleFromMoving: [TS.MOVING, TS.SETTLED],
      settleFromDropping: [TS.DROPPING, TS.SETTLED],
    });
  }

  getState() {
    return this.state.getState();
  }

  create() {
    this.state.create();
  }

  drop() {
    this.state.drop();
  }

  settle() {
    if (this.getState() === TS.MOVING) {
      this.state.settleFromMoving();
      return;
    }
    if (this.getState() === TS.DROPPING) {
      this.state.settleFromDropping();
      return;
    }
    throw new Error('settle from state: ' + this.getState());
  }
}

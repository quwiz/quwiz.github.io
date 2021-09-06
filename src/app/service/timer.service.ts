import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private interval: any;
  private endTime: number;

  constructor() {
    this.interval = null;
    this.endTime = -1;
  }

  countdown(seconds: number,
            onCountdown: (ts: number) => void = () => {},
            onTimeUp: () => void = () => {}): void {
    const inst = this;

    inst.endTime = dayjs().unix() + seconds + 1;

    inst.interval = setInterval(() => {
      const now = dayjs().unix();

      if (now >= inst.endTime + 1) {
        clearInterval(inst.interval);
        inst.endTime = -1;

        onTimeUp();

        return;
      }

      onCountdown(inst.endTime - now);
    }, 1000);
  }

  resetTimer(): void {
    clearInterval(this.interval);
  }
}

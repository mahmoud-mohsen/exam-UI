import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

  @Output() submitAnswer = new EventEmitter();
  @Input() timeLeft: number;
  interval;
  subscribeTimer: any;
  counter: Date;
  constructor() { }

  ngOnInit(): void {
    this.counter = new Date(0, 0, 0, 0, 0, 0);
    this.counter.setSeconds(this.timeLeft);
    this.startTimer();
  }
  oberserableTimer() {
    const source = timer(1000, 2000);
    const abc = source.subscribe(val => {
      console.log(val, '-');
      this.subscribeTimer = this.timeLeft - val;
    });
  }

  startTimer() {

    this.interval = setInterval(() => {
      console.log(this.timeLeft);
      
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.counter = new Date(0, 0, 0, 0, 0, 0);
        this.counter.setSeconds(this.timeLeft);
      } else {
        this.submitAnswer.emit();
      }
    }, 1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

}

import { Component, computed, signal } from '@angular/core';

@Component({
  standalone: false,
  templateUrl: './counter-page.component.html',
  styleUrl: './counter-page.component.css',
})
export class CounterPageComponent {
  public counter = signal(10);
  public squareCounter = computed(() => this.counter() * this.counter());

  increaseBy(value: number) {
    // this.counter.set(this.counter() + value);
    this.counter.update((current) => current + value);
  }
}

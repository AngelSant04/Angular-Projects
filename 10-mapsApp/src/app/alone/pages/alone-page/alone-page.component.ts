import { Component } from '@angular/core';
import { CounterAloneComponent } from "../../components/counter-alone/counter-alone.component";

@Component({
  templateUrl: './alone-page.component.html',
  styleUrl: './alone-page.component.css',
  imports: [CounterAloneComponent],
})
export class AlonePageComponent {}

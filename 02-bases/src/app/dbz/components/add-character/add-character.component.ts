import { Component, EventEmitter, Output } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'dbz-add-character',
  standalone: false,

  templateUrl: './add-character.component.html',
  styleUrl: './add-character.component.css',
})
export class AddCharacterComponent {
  @Output()
  public onNewCharacter: EventEmitter<Character> = new EventEmitter();

  public character: Character = {
    id: '',
    name: '',
    power: 0,
  };

  emitCharacter(): void {
    // debugger;  --> Se detiene la ejecución

    if (this.character.name.length == 0) return;
    this.onNewCharacter.emit({ ...this.character });
    this.character = {
      id: '',
      name: '',
      power: 0,
    };
  }
}

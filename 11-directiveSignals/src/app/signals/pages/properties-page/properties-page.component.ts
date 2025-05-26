import { Component, computed, effect, OnDestroy, signal } from '@angular/core';
import { User } from '../../interfaces/user-request';

@Component({
  standalone: false,
  templateUrl: './properties-page.component.html',
  styleUrl: './properties-page.component.css',
})
export class PropertiesPageComponent implements OnDestroy {
  public counter = signal(10);

  public user = signal<User>({
    id: 2,
    email: 'janet.weaver@reqres.in',
    first_name: 'Janet',
    last_name: 'Weaver',
    avatar: 'https://reqres.in/img/faces/2-image.jpg',
  });

  public nameUser = computed<string>(
    () => `${this.user()?.first_name} ${this.user()?.last_name}`
  );

  public userChangedEffect = effect(() => {
    console.log(`${this.user().first_name} - ${this.counter()}`);
  });

  onFieldUpdated(field: keyof User, value: string) {
    // this.user.set({
    //   ...this.user(),
    //   [field]: value,
    // });

    // this.user.update((current) => ({
    //   ...current,
    //   [field]: value,
    // }));

    this.user.update((current) => {
      const updatedUser = { ...current };
      switch (field) {
        case 'email':
          updatedUser.email = value;
          break;
        case 'avatar':
          updatedUser.avatar = value;
          break;
        case 'first_name':
          updatedUser.first_name = value;
          break;
        case 'last_name':
          updatedUser.last_name = value;
          break;
        case 'id':
          updatedUser.id = Number(value);
          break;
      }
      return updatedUser;
    });
  }

  ngOnDestroy(): void {
    // this.userChangedEffect.destroy();
  }

  increasyBy(value: number) {
    this.counter.update((current) => current + value);
  }
}

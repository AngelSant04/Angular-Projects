import { Component } from '@angular/core';

@Component({
  selector: 'app-basics-page',
  templateUrl: './basics-page.component.html',
  styleUrl: './basics-page.component.css',
})
export class BasicsPageComponent {
  public nameLower: string = 'angel';
  public nameUpper: string = 'ANGEL';
  public fullName: string = 'AnGeL SaNtAmArIa';

  public customDate: Date = new Date();
}

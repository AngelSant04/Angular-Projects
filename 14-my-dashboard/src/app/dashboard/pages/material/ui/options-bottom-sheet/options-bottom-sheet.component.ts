import { Component, inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
@Component({
  selector: 'app-options-bottom-sheet',
  imports: [MatListModule],
  templateUrl: './options-bottom-sheet.component.html',
})
export class OptionsBottomSheetComponent {
  // private _bottomSheetRef =
  //   inject<MatBottomSheetRef<BottomSheetOverviewExampleSheet>>(
  //     MatBottomSheetRef
  //   );

  openLink(event: MouseEvent): void {
    // this._bottomSheetRef.dismiss();
    // event.preventDefault();
    console.log('openLink', event);
  }
}

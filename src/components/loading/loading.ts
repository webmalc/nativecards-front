import { Component, Input } from '@angular/core';

@Component({
  selector: 'loading',
  templateUrl: 'loading.html'
})
export class LoadingComponent {

  @Input() data: any;
}

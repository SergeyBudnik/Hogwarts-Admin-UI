import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-header-item',
  templateUrl: './header-item.view.html',
  styleUrls: ['./header-item.view.less']
})
export class HeaderItemView {
  @Input('icon') public icon: string;
  @Input('text') public text: string;
  @Input('active') public active: boolean;
}

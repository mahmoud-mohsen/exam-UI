import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    public translate: TranslateService) {
    translate.addLangs(['en', 'ar','fr']);
    if (localStorage.getItem('locale')) {
      const browserLang = localStorage.getItem('locale');
      translate.use(browserLang.match(/en|ar/) ? browserLang : 'en');

    } else {
      localStorage.setItem('locale', 'en');
      translate.setDefaultLang('en');
    }
  }
}

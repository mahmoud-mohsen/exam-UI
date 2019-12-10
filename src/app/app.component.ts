import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MultilanguageApp';  
  
  constructor(  
    public translate: TranslateService) {  
    translate.addLangs(['en', 'ar']);  
    if (localStorage.getItem('locale')) {  
      const browserLang = localStorage.getItem('locale');  
      translate.use(browserLang.match(/en|ar/) ? browserLang : 'ar');  
      // translate.use('ar');  

    } else {  
      localStorage.setItem('locale', 'en');  
      translate.setDefaultLang('ar');  
    }  
  }  
  changeLang(language: string) {  
    localStorage.setItem('locale', language);  
    this.translate.use(language);  
  }  
}

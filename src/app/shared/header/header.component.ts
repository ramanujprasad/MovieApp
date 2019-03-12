import { Component, OnInit } from '@angular/core';
import { TranslateService } from './../../core/services/translate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    public translatedText: string;
    public supportedLanguages: any[];

    constructor(private _translate: TranslateService) { }

    ngOnInit() {
      // This data is available in header
      this.supportedLanguages = [
        { display: 'English', value: 'en' },
        { display: 'Dutch', value: 'nl' }
      ];
      this.selectLang('en');
    }

    isCurrentLang(lang: string) {
      return lang === this._translate.currentLang;
    }

    selectLang(lang: string) {
      // set default language;
      this._translate.use(lang);
    }
}

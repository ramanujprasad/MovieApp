import { InjectionToken } from '@angular/core';

// import translations
import { LANG_EN_NAME, LANG_EN_TRANS } from '../labels/lang-en';
import { LANG_NL_NAME, LANG_NL_TRANS } from '../labels/lang-nl';

// translation token
export const Translations = new InjectionToken('translations');

const dictionary = { 'en': LANG_EN_TRANS, 'nl': LANG_NL_TRANS };

// providers
export const TranslationProvider = [{	provide: Translations, useValue: dictionary}];

import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { LanguageOptionType } from '@/app/types/layout'

const STORAGE_KEY = '__OFICINA_ANGULAR_LANG__'

const availableLanguages: LanguageOptionType[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: 'assets/images/flags/us.svg',
  },
  {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    flag: 'assets/images/flags/br.svg',
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: 'assets/images/flags/es.svg',
  },
]

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private currentLangSubject = new BehaviorSubject<LanguageOptionType>(
    availableLanguages[0]
  )
  currentLang$ = this.currentLangSubject.asObservable()

  getLanguages(): LanguageOptionType[] {
    return availableLanguages
  }

  setLanguage(code: string) {
    const lang = availableLanguages.find((l) => l.code === code)
    if (lang) {
      this.currentLangSubject.next(lang)
      localStorage.setItem(STORAGE_KEY, code)
    }
  }

  initLanguage() {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) this.setLanguage(saved)
  }
}

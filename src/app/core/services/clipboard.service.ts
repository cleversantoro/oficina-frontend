import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ClipboardService {
  async copyText(value: string): Promise<void> {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(value);
      } catch (err) {
        return Promise.reject('Clipboard write failed: ' + err);
      }
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = value;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';

      document.body.appendChild(textarea);
      textarea.select();

      try {
        const success = document.execCommand('copy');
        if (!success) throw new Error('Fallback copy failed');
      } catch (err) {
        return Promise.reject('Fallback copy failed: ' + err);
      } finally {
        document.body.removeChild(textarea);
      }
    }

    return Promise.resolve();
  }

  async cutText(element: HTMLInputElement | HTMLTextAreaElement): Promise<void> {
    if (!element.readOnly && !element.disabled) {
      element.select();
      try {
        const success = document.execCommand('cut');
        if (!success) throw new Error('Cut command failed');
        return Promise.resolve();
      } catch (err) {
        return Promise.reject('Cut failed: ' + err);
      }
    } else {
      return Promise.reject('Element is not editable');
    }
  }

  highlightElementText(el: HTMLElement): void {
    const range = document.createRange();
    range.selectNodeContents(el);
    const selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
}

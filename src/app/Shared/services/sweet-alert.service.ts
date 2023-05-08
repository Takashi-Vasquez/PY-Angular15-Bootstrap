import { Injectable, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import sweetalert2 from 'sweetalert2';

import { Constants } from '../models/common/constants.model';
import { ErrorModel } from '../models/common/response.model';

@Injectable()
export class SweetAlertService {

  constructor(private sanitizer: DomSanitizer) { }

  private static getTitle(status: number) {
    if (status === Constants.STATUS.Success) {
      return 'Éxito';
    }
    if (status === Constants.STATUS.Warning) {
      return '¡Advertencia!';
    }
    return 'Error';
  }

  private static getIcon(status: number) {
    if (status === Constants.STATUS.Success) {
      return 'success';
    }
    if (status === Constants.STATUS.Warning) {
      return 'warning';
    }
    return 'error';
  }

  private getBackgroundAndIcon(status: number) {
    if (status == Constants.STATUS.Success)
      return {
        confirmButtonColor: '#0069B4',
        iconHtml: '<svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">' +
          '<path d="M41.9998 0C18.8412 0 0 18.8408 0 41.9998C0 65.1588 18.8412 84 41.9998 84C65.1583 84 83.9996 65.1588 83.9996 41.9998C83.9996 18.8408 65.1588 0 41.9998 0ZM66.1168 34.9057L39.7305 61.292C38.6085 62.4139 37.1171 63.0314 35.5306 63.0314C33.9441 63.0314 32.4527 62.4139 31.3308 61.292L17.8828 47.844C16.7608 46.722 16.1429 45.2306 16.1429 43.6441C16.1429 42.0572 16.7608 40.5658 17.8828 39.4438C19.0043 38.3219 20.4957 37.704 22.0826 37.704C23.6691 37.704 25.1609 38.3219 26.2825 39.4443L35.5302 48.6916L57.7162 26.5055C58.8382 25.3836 60.3296 24.7661 61.9161 24.7661C63.5026 24.7661 64.994 25.3836 66.1159 26.5055C68.4326 28.8222 68.4326 32.5899 66.1168 34.9057Z" fill="#4AD395"/>' +
          '</svg>'
      }

    if (status == Constants.STATUS.Error)
      return {
        confirmButtonColor: '#0069B4',
        iconHtml: '<svg width="84" height="84" viewBox="0 0 84 84" fill="none" xmlns="http://www.w3.org/2000/svg">' +
          '<path d="M42 0C18.774 0 0 18.774 0 42C0 65.226 18.774 84 42 84C65.226 84 84 65.226 84 42C84 18.774 65.226 0 42 0ZM60.06 60.06C58.422 61.698 55.776 61.698 54.138 60.06L42 47.922L29.862 60.06C28.224 61.698 25.578 61.698 23.94 60.06C22.302 58.422 22.302 55.776 23.94 54.138L36.078 42L23.94 29.862C22.302 28.224 22.302 25.578 23.94 23.94C25.578 22.302 28.224 22.302 29.862 23.94L42 36.078L54.138 23.94C55.776 22.302 58.422 22.302 60.06 23.94C61.698 25.578 61.698 28.224 60.06 29.862L47.922 42L60.06 54.138C61.656 55.734 61.656 58.422 60.06 60.06Z" fill="#E4223F"/>' +
          '</svg>'
      }

    if (status == Constants.STATUS.Warning)
      return {
        confirmButtonColor: '#0069B4',
        iconHtml: '<svg width="89" height="84" viewBox="0 0 89 84" fill="none" xmlns="http://www.w3.org/2000/svg">' +
          '<path d="M87.1508 64.2761L55.7114 6.39209C50.6601 -2.12504 38.3467 -2.13635 33.2886 6.39209L1.85073 64.2761C-3.31301 72.9791 2.93872 84 13.0595 84H75.9394C86.0517 84 92.3146 72.988 87.1508 64.2761ZM44.5 73.554C41.6252 73.554 39.2852 71.2103 39.2852 68.331C39.2852 65.4518 41.6252 63.108 44.5 63.108C47.3748 63.108 49.7148 65.4518 49.7148 68.331C49.7148 71.2103 47.3748 73.554 44.5 73.554ZM49.7148 52.662C49.7148 55.5413 47.3748 57.885 44.5 57.885C41.6252 57.885 39.2852 55.5413 39.2852 52.662V26.5471C39.2852 23.6678 41.6252 21.3241 44.5 21.3241C47.3748 21.3241 49.7148 23.6678 49.7148 26.5471V52.662Z" fill="#FFC93C"/>' +
          '</svg>'
      }

    return {};
  }

  showAlert(errors: ErrorModel[], statusResponse: number, messageResponse: string) {
    let status: number;
    let message: string;

    if (!errors) {
      status = Constants.STATUS.Success;
      message = Constants.MESSAGE_STATUS.Success;
    }

    if (errors || statusResponse == Constants.STATUS.Error) {
      status = Constants.STATUS.Error;
      if (messageResponse) message = messageResponse;
      else message = errors[0].message;
    }

    return sweetalert2.fire({
      title: SweetAlertService.getTitle(status),
      html: this.sanitizer.sanitize(SecurityContext.HTML, message),
      icon: SweetAlertService.getIcon(status),
      confirmButtonColor: '#0069B4',
      confirmButtonText: "Aceptar",
      ...this.getBackgroundAndIcon(status)
    });
  }

  show(status: number, message: string) {
    if (message.toLocaleLowerCase() === 'success') {
      message = Constants.MESSAGE_STATUS.Success;
    }

    return sweetalert2.fire({
      title: SweetAlertService.getTitle(status),
      html: this.sanitizer.sanitize(SecurityContext.HTML, message),
      icon: SweetAlertService.getIcon(status),
      confirmButtonColor: '#0069B4',
      confirmButtonText: "Aceptar",
      ...this.getBackgroundAndIcon(status)
    });
  }

  // Confirmación para eliminar
  confirmation(message: string, status: number = Constants.STATUS.Warning) {
    return sweetalert2.fire({
      title: SweetAlertService.getTitle(status),
      html: this.sanitizer.sanitize(SecurityContext.HTML, message),
      icon: SweetAlertService.getIcon(status),
      showCancelButton: true,
      cancelButtonColor: '#DDDDDD',
      confirmButtonColor: '#0069B4',
      cancelButtonText: "Cancelar",
      confirmButtonText: "Aceptar",
      ...this.getBackgroundAndIcon(status)
    });
  }

  confirmation2(message1: string, message2: string) {
    message1 = this.sanitizer.sanitize(SecurityContext.HTML, message1);
    message2 = this.sanitizer.sanitize(SecurityContext.HTML, message2);

    const htmlMessage = `${message1}
        <div class="alert alert-custom alert-light-warning fade show mt-5 py-3" role="alert">
            <div class="alert-icon"><i class="flaticon-warning"></i></div>
            <div class="alert-text text-justify">${message2}</div>
            <div class="alert-close">
        </div>`;

    return sweetalert2.fire({
      title: SweetAlertService.getTitle(Constants.STATUS.Warning),
      html: htmlMessage,
      icon: SweetAlertService.getIcon(Constants.STATUS.Warning),
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      ...this.getBackgroundAndIcon(Constants.STATUS.Warning)
    });
  }

  confirmationWithTextArea(title: string, messageValidator: string) {
    return sweetalert2.fire({
      title,
      icon: SweetAlertService.getIcon(Constants.STATUS.Warning),
      input: 'textarea',
      inputPlaceholder: messageValidator,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      ...this.getBackgroundAndIcon(Constants.STATUS.Warning),
      inputValidator: (value) => {
        if (!value) {
          return messageValidator;
        }
      }
    });
  }

  showExpiredLicense(title: string, message: string) {
    if (message.toLocaleLowerCase() === 'success') {
      message = Constants.MESSAGE_STATUS.Success;
    }

    return sweetalert2.fire({
      title,
      html: this.sanitizer.sanitize(SecurityContext.HTML, message),
      icon: SweetAlertService.getIcon(Constants.STATUS.Error),
      ...this.getBackgroundAndIcon(Constants.STATUS.Error),
      showCancelButton: true,
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'Contactarse'
    });
  }
}

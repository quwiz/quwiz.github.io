import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class QuWizToastrService {
  private config = {
    timeout: 3000,
    closeButton: true,
    enableHtml: true
  };

  constructor(private toastr: ToastrService) { }

  toastError(message: string): void {
    this.toastr.error(message, 'ERROR!', this.config);
  }

  toastWarning(message: string): void {
    this.toastr.warning(message, 'WARNING!', this.config);
  }
}

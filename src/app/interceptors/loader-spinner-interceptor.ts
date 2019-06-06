import { Injectable } from '@angular/core';
import { LoaderSpinnerService } from '../services/loader-spinner.service';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';


@Injectable()
export class LoaderSpinnerInterceptor {
  constructor(public loaderService: LoaderSpinnerService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();

    return next.handle(request)
      .pipe(finalize(() => {
        return this.loaderService.hide()
      }));
  }
}

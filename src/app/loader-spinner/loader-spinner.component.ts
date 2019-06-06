import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderSpinnerService } from '../services/loader-spinner.service';

@Component({
  selector: 'app-loader-spinner',
  templateUrl: './loader-spinner.component.html',
  styleUrls: ['./loader-spinner.component.scss']
})
export class LoaderSpinnerComponent implements OnInit {
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  isLoadingSub: Subscription;
  isLoading = false;
  constructor(private loaderSpinnerService: LoaderSpinnerService) { }

  ngOnInit() {
    this.isLoadingSub = this.loaderSpinnerService.getIsLoadingListener().subscribe(isLoading => {
      this.isLoading = isLoading;
    })
  }

}

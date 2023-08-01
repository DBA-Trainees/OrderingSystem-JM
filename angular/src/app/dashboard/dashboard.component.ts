import { Component, Injector } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { FoodDto, FoodDtoPagedResultDto, FoodServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

class PagedDashboardResultRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'  ,
  styleUrls: ['./dashboard.component.css']
})


export class dashboardComponent {
  
}

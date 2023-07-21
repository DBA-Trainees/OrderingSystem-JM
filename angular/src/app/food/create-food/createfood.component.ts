import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { forEach as _forEach, map as _map } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import {
  FoodServiceProxy,
  FoodDto,
  CreateFoodDto
}from '@shared/service-proxies/service-proxies';
import { AbpValidationError } from '@shared/components/validation/abp-validation.api';
import { Router } from '@angular/router';
@Component({
  selector : 'app-createfood',
  templateUrl: './createfood.component.html',
  // styleUrls: ['./CreateFood.component.css']
})
export class createfoodComponent extends AppComponentBase implements OnInit {
saving = false;
food = new FoodDto();

@Output() onSave = new EventEmitter<any>();

constructor(
  injector: Injector,
  public _foodService: FoodServiceProxy,
  public router: Router,
  public bsModalRef: BsModalRef
) {
  super(injector);
}
  ngOnInit(): void {
  }
save(): void {
  this.saving = true;


  this._foodService.create(this.food).subscribe(
    () => {
      this.notify.info(this.l('SavedSuccessfully'));
      this.bsModalRef.hide();
      this.onSave.emit();
      this.router.navigateByUrl('/app/createfood')
    },
    () => {
      this.saving = false;
    }
  );
}
 }

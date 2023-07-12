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
  UserServiceProxy,
  CreateUserDto,
  RoleDto,
  CreateFoodDto,
  FoodServiceProxy
}from '@shared/service-proxies/service-proxies';
import { AbpValidationError } from '@shared/components/validation/abp-validation.api';

@Component({
  selector : 'app-createfood',
  templateUrl: './createfood.component.html',
  // styleUrls: ['./CreateFood.component.css']
})
export class createfoodComponent extends AppComponentBase implements OnInit {
saving = false;
user = new CreateFoodDto();

@Output() onSave = new EventEmitter<any>();
constructor(
  injector: Injector,
  public _foodService: FoodServiceProxy,
  public bsModalRef: BsModalRef
) {
  super(injector);
}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
save(): void {
  this.saving = true;


  this._foodService.create(this.user).subscribe(
    () => {
      this.notify.info(this.l('SavedSuccessfully'));
      this.bsModalRef.hide();
      this.onSave.emit();
    },
    () => {
      this.saving = false;
    }
  );
}
 }

import {   Component,Injector, OnInit, EventEmitter, Output} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { forEach as _forEach, includes as _includes, map as _map } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import { CategoriesDto,CategoriesServiceProxy} from '@shared/service-proxies/service-proxies';


@Component({
  selector: 'editcategory',
  templateUrl: './editcategory.component.html',
})

export class editcategoryComponent extends AppComponentBase
implements OnInit {
  saving = false;
  category = new CategoriesDto();
  id: number;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _categoryService: CategoriesServiceProxy,
    public bsModalRef: BsModalRef
  )
 {super(injector);}

  ngOnInit(): void {
    if(this.id){
      this._categoryService.get(this.id).subscribe((result) => {
        this.category = result;
      });
    }
  }

  
  save(): void {
    this.saving = true;

    if(this.id !==0){
      this._categoryService.update(this.category).subscribe(
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
}

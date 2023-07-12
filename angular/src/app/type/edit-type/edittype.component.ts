import {   Component,Injector, OnInit, EventEmitter, Output} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { forEach as _forEach, includes as _includes, map as _map } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import { TypeDto,TypeServiceProxy} from '@shared/service-proxies/service-proxies';


@Component({
  templateUrl: './edittype.component.html',
})

export class edittypeComponent extends AppComponentBase
implements OnInit {
  saving = false;
  type = new TypeDto();
  id: number;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _typeService: TypeServiceProxy,
    public bsModalRef: BsModalRef
  )
 {super(injector);}

  ngOnInit(): void {
    if(this.id){
      this._typeService.get(this.id).subscribe((result) => {
        this.type = result;
      });
    }
  }

  
  save(): void {
    this.saving = true;

    if(this.id !==0){
      this._typeService.update(this.type).subscribe(
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

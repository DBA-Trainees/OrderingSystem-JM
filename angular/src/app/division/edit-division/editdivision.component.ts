import {   Component,Injector, OnInit, EventEmitter, Output} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { forEach as _forEach, includes as _includes, map as _map } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import { DivisionDto,DivisionServiceProxy} from '@shared/service-proxies/service-proxies';


@Component({
  selector: 'app-editdivision',
  templateUrl: './editdivision.component.html',
})

export class editdivisionComponent extends AppComponentBase
implements OnInit {
  saving = false;
  division = new DivisionDto();
  id: number;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _divisionService: DivisionServiceProxy,
    public bsModalRef: BsModalRef
  )
 {super(injector);}

  ngOnInit(): void {
    if(this.id){
      this._divisionService.get(this.id).subscribe((result) => {
        this.division = result;
      });
    }
  }

  
  save(): void {
    this.saving = true;

    if(this.id !==0){
      this._divisionService.update(this.division).subscribe(
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

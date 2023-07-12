import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
} from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { forEach as _forEach, map as _map } from "lodash-es";
import { AppComponentBase } from "@shared/app-component-base";
import {
  CreateTypeDto,
  TypeServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { Router } from "@angular/router";

@Component({
  selector: "app-createtype",
  templateUrl: "./createtype.component.html",
})
export class createtypeComponent extends AppComponentBase implements OnInit {
  saving = false;
  types = new CreateTypeDto();

  @Output() onSave = new EventEmitter<any>();
  constructor(
    injector: Injector,
    public _typeService: TypeServiceProxy,
    public bsModalRef: BsModalRef,
    private router: Router
  ) {
    super(injector);
  }

  ngOnInit(): void {
   
  }
  save(): void {
    this.saving = true;

    this._typeService.create(this.types).subscribe(
      () => {
        this.notify.info(this.l("SavedSuccessfully"));
        this.bsModalRef.hide();
        this.onSave.emit();
        this.router.navigate(["/app/type"]);
      },
      () => {
        this.saving = false;
      }
    );
  }
}

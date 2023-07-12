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
  CreateDivisionDto,
  DivisionServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { Router } from "@angular/router";

@Component({
  selector: "createdivision",
  templateUrl: "./createdivision.component.html",
})
export class createdivisionComponent extends AppComponentBase implements OnInit {
  saving = false;
  division = new CreateDivisionDto();

  @Output() onSave = new EventEmitter<any>();
  constructor(
    injector: Injector,
    public _divisionService: DivisionServiceProxy,
    public bsModalRef: BsModalRef,
    private router: Router
  ) {
    super(injector);
  }

  ngOnInit(): void {
  }
  save(): void {
    this.saving = true;

    this._divisionService.create(this.division).subscribe(
      () => {
        this.notify.info(this.l("SavedSuccessfully"));
        this.bsModalRef.hide();
        this.onSave.emit();
        this.router.navigate(["/app/division"]);
      },
      () => {
        this.saving = false;
      }
    );
  }
}

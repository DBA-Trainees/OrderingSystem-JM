import { Component, Injector } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { DivisionDto, DivisionDtoPagedResultDto, DivisionServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { editdivisionComponent } from './edit-division/editdivision.component';

class PagedDivisionResultRequestDto extends PagedRequestDto{
  keyword: string;
  isActive: boolean | null;
}

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  // styleUrls: ['./Division.component.css']
})

export class divisionComponent extends PagedListingComponentBase <DivisionDto>{
 
  division: DivisionDto[] = [];
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _divisionService: DivisionServiceProxy,
    private _modalService: BsModalService

  ){
    super(injector);
  }

  editdivision(division: DivisionDto): void{
    this.showEditDivision(division.id)
  }
  private showEditDivision(id?: number): void {
    let EditDivision: BsModalRef;
    EditDivision = this._modalService.show(
      editdivisionComponent,
      {
        class: 'model-lg',
        initialState:{
          id:id,
        }
      }
    )
    EditDivision.content.onSave.subscribe(()=>
    {
      this.refresh();
    });
  }

  protected delete(division: DivisionDto): void {
abp.message.confirm(
  this.l('',division.name),
  undefined,
  (result:boolean)=> {
    if(result){
      this._divisionService.delete(division.id).subscribe(()=>
      {
        abp.notify.success(this.l('Succesfully Deleted'));
        this.refresh();
      })
    }
  }
)
  }

  protected list(
    request: PagedDivisionResultRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;
  
    this._divisionService.getAll(  
      request.keyword,
      request.isActive,
      request.skipCount,
      request.maxResultCount).pipe(finalize(() => {
        finishedCallback();
      })).subscribe((result: DivisionDtoPagedResultDto)=> {
        this.division = result.items;
        this.showPaging(result, pageNumber);
      })
  }
}

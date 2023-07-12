import { Component, Injector } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { TypeDto, TypeDtoPagedResultDto, TypeServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { edittypeComponent } from './edit-type/edittype.component';

class PagedTypeResultRequestDto extends PagedRequestDto{
  keyword: string;
  isActive: boolean | null;
}
@Component({
  selector: 'app-Type',
  templateUrl: './type.component.html',
  // styleUrls: ['./Type.component.css']
})
export class typeComponent extends PagedListingComponentBase <TypeDto> {
 
  types: TypeDto[] = [];
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;

   
 constructor(
  injector: Injector,
  private _typeService: TypeServiceProxy,
  private _modalService: BsModalService
){
  super(injector);
}

edittype(types: TypeDto): void {
  this.ShowEditType(types.id)
  }
  private ShowEditType(id?: number): void {
    let EditType: BsModalRef;
    EditType = this._modalService.show(
      edittypeComponent,
      {
        class: 'modal-lg',
        initialState:{
          id: id,
        },
      }
    )
    EditType.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  protected delete(category: TypeDto): void{
    abp.message.confirm(
      this.l('', category.name),
      undefined,
      (result: boolean) => {
        if(result){
          this._typeService.delete(category.id).subscribe(() => {
            abp.notify.success(this.l('Successfully Deleted'));
            this.refresh();
          })
        }
      }
      
    )
  }

  protected list(
    request: PagedTypeResultRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;
  
    this._typeService.getAll(  
      request.keyword,
      request.isActive,
      request.skipCount,
      request.maxResultCount).pipe(finalize(() => {
        finishedCallback();
      })).subscribe((result: TypeDtoPagedResultDto)=> {
        this.types = result.items;
        this.showPaging(result, pageNumber);
      })
  }
}

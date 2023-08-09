import { Component, Injector } from "@angular/core";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import {
  CategoriesDto,
  CategoriesDtoPagedResultDto,
  CategoriesServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { finalize } from "rxjs";
import { editcategoryComponent } from "./edit-category/editcategory.component";
import { createcategoryComponent } from "./create-category/createcategory.component";
import { property } from "lodash-es";

class PagedCategoriesResultRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}
@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
})
export class categoryComponent extends PagedListingComponentBase<CategoriesDto> {
  category: CategoriesDto[] = [];
  keyword = "";
  isActive: boolean | null;
  advancedFiltersVisible = false;
  searchText: any;

  constructor(  
   
    injector: Injector,
    private _categoryService: CategoriesServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }
  
  // filterArray(){
  //   var properties = Object.keys(this.category[0]); 
  //   this.category = this.category.filter((c) => {

  //      return properties.find((property)=> {
        
  //       let valueString = c[property].toString().toLowerCase();

  //       return valueString.includes(this.searchText.toLowerCase());
        
  //      })? c : null; 
  //   })
  // }

  createCategory(): void {
    this.showCreateorEditCategory();
  }

  editCategory(category: CategoriesDto): void {
    this.showCreateorEditCategory(category.id);
  }

  private showCreateorEditCategory(id?: number): void {
    let CreateorEditCategory: BsModalRef;
    if (!id) {
      CreateorEditCategory = this._modalService.show(createcategoryComponent, {
        class: "modal-lg",
      });
    } else {
      CreateorEditCategory = this._modalService.show(editcategoryComponent, {
        class: "modal-lg",
        initialState: {
          id: id,
        },
      });
    }

    CreateorEditCategory.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  protected delete(category: CategoriesDto): void {
    abp.message.confirm(
      this.l("", category.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._categoryService.delete(category.id).subscribe(() => {
            abp.notify.success(this.l("Successfully Deleted"));
            this.refresh();
          });
        }
      }
    );
  }

  list(
    request: PagedCategoriesResultRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;
    this._categoryService
      .getAll(
        request.keyword,
        request.isActive,
        request.skipCount,
        request.maxResultCount
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: CategoriesDtoPagedResultDto) => {
        this.category = result.items;
        this.showPaging(result, pageNumber);
      });
  }
}

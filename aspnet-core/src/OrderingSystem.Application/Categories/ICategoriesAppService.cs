using Abp.Application.Services;
using OrderingSystem.Categories.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Categories
{
    public interface ICategoriesAppService : IAsyncCrudAppService<CategoriesDto, int, PagedCategoriesResultRequestDto, CreateCategoriesDto, CategoriesDto>
    {
    }
}

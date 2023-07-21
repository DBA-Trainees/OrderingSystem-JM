using Abp.Application.Services;
using Abp.Application.Services.Dto;
using OrderingSystem.Categories.Dto;
using OrderingSystem.Foods.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Foods
{
    public interface IFoodAppService : IAsyncCrudAppService <FoodDto,int, PagedFoodResultRequestDto, CreateFoodDto, FoodDto>
    {
        Task<PagedResultDto<FoodDto>> GetCategory(PagedResultRequestDto input);
    }
}

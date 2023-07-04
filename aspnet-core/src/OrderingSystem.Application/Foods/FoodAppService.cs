using Abp.Application.Services;
using Abp.Domain.Repositories;
using OrderingSystem.Entities;
using OrderingSystem.Foods.Dto;

namespace OrderingSystem.Foods
{
    public class FoodAppService : AsyncCrudAppService<Food, FoodDto, int, PagedFoodResultRequest, CreateFoodDto, FoodDto>, IFoodAppService
    {
        public FoodAppService(IRepository<Food, int> repository) : base(repository)
        {
        }
    }

}

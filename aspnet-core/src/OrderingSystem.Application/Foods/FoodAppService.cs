using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using OrderingSystem.Entities;
using OrderingSystem.Foods.Dto;
using System.Threading.Tasks;

namespace OrderingSystem.Foods
{
    public class FoodAppService : AsyncCrudAppService<Food, FoodDto, int, PagedFoodResultRequestDto, CreateFoodDto, FoodDto>, IFoodAppService
    {
        public FoodAppService(IRepository<Food, int> repository) : base(repository)
        {
        }

        public override Task<FoodDto> CreateAsync(CreateFoodDto input)
        {
            return base.CreateAsync(input);
        }

        public override Task DeleteAsync(EntityDto<int> input)
        {
            return base.DeleteAsync(input);
        }

        public override Task<PagedResultDto<FoodDto>> GetAllAsync(PagedFoodResultRequestDto input)
        {
            return base.GetAllAsync(input);
        }

        public override Task<FoodDto> GetAsync(EntityDto<int> input)
        {
            return base.GetAsync(input);
        }

        public override Task<FoodDto> UpdateAsync(FoodDto input)
        {
            return base.UpdateAsync(input);
        }
    }

}

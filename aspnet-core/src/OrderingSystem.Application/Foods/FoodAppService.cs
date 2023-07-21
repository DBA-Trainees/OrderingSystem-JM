using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using OrderingSystem.Categories.Dto;
using OrderingSystem.Divisions.Dto;
using OrderingSystem.Entities;
using OrderingSystem.Foods.Dto;
using System.Linq;
using System.Threading.Tasks;

namespace OrderingSystem.Foods
{
    public class FoodAppService : AsyncCrudAppService<Food, FoodDto, int, PagedFoodResultRequestDto, CreateFoodDto, FoodDto>, IFoodAppService
    {
        private readonly IRepository<Food, int> _repository;

        public FoodAppService(IRepository<Food, int> repository) : base(repository)
        {
            _repository = repository;
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
        
        public async Task<PagedResultDto<FoodDto>> GetCategory(PagedResultRequestDto input)
        {
            var food = await _repository.GetAll()
                .Include(x => x.Category)
                .Select(x => ObjectMapper.Map<FoodDto>(x))
                .ToListAsync();

            return new PagedResultDto<FoodDto>(food.Count(), food);
        }

        //public async Task<PagedResultDto<FoodDto>> GetCategory(PagedResultRequestDto input)
        //{
        //    var food = await _repository.GetAll()
        //        .Include(x => x.Category)
        //        .Select(x => ObjectMapper.Map<FoodDto>(x))
        //        .ToListAsync();

        //    return new PagedResultDto<FoodDto>(food.Count(), food);
        //}

    }
}

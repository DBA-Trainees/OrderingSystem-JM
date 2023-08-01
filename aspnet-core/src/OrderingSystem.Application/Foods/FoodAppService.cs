using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using OrderingSystem.Categories.Dto;
using OrderingSystem.Divisions.Dto;
using OrderingSystem.Entities;
using OrderingSystem.Foods.Dto;
using OrderingSystem.Typess.Dto;
using System.Linq;
using System.Threading.Tasks;

namespace OrderingSystem.Foods
{
    public class FoodAppService : AsyncCrudAppService<Food, FoodDto, int, PagedFoodResultRequestDto, CreateFoodDto, FoodDto>, IFoodAppService
    {
        private readonly IRepository<Food, int> _repository;
        private readonly IRepository<Category, int> _categoryrepository;
        private readonly IRepository<Types, int> _typerepository;

        public FoodAppService(IRepository<Food, int> repository, IRepository<Category, int> categoryrepository, IRepository<Types, int> typerepository) : base(repository)
        {
            _repository = repository;
            _categoryrepository = categoryrepository;
            _typerepository = typerepository;
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
        
        public async Task<PagedResultDto<CategoriesDto>> GetCategory()
        {
            //To view the innerjoined data in dropdown
            var query = await _categoryrepository.GetAll()
                .Select(x => ObjectMapper.Map<CategoriesDto>(x))
                .ToListAsync();

            return new PagedResultDto<CategoriesDto>(query.Count(), query);
        }
    
        public async Task<PagedResultDto<TypeDto>> GetType()
        {
            var type = await _typerepository.GetAll()
                .Select(x =>    ObjectMapper.Map<TypeDto>(x))
                .ToListAsync();

            return new PagedResultDto<TypeDto>(type.Count(), type);
        }

        public async Task<PagedResultDto<FoodDto>> GetAllFoodWithTypeandCategory(PagedFoodResultRequestDto input)
        {
            var food = await _repository.GetAll()
                .Include(x => x.Types)
                .Include(x => x.Category)
                .Select(x => ObjectMapper.Map<FoodDto>(x))
                .ToListAsync();

            return new PagedResultDto<FoodDto>(food.Count(), food);
        }
    }
}

using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using OrderingSystem.Categories.Dto;
using OrderingSystem.Entities;
using System.Linq;
using System.Threading.Tasks;

namespace OrderingSystem.Categories
{
    public class CategoriesAppService : AsyncCrudAppService<Category, CategoriesDto, int, PagedCategoriesResultRequestDto, CreateCategoriesDto, CategoriesDto>, ICategoriesAppService
    {
        private readonly IRepository<Food, int> _foodrepository;
        public CategoriesAppService(IRepository<Category, int> repository, IRepository<Food, int> foodrepository) : base(repository)
        {
            _foodrepository = foodrepository;
        }

        public override Task<CategoriesDto> CreateAsync(CreateCategoriesDto input)
        {
            return base.CreateAsync(input);
        }

        public override Task DeleteAsync(EntityDto<int> input)
        {
            var exist = _foodrepository.GetAll()
                .Where(x => x.CategoryId == input.Id)
                .FirstOrDefault();
            if (exist == null)
            {
                return base.DeleteAsync(input);
            }
            else
            {
                throw new UserFriendlyException("Category exist in the list of foods");
            }
        }

        public override Task<PagedResultDto<CategoriesDto>> GetAllAsync(PagedCategoriesResultRequestDto input)
        {
            return base.GetAllAsync(input);
        }

        public override Task<CategoriesDto> GetAsync(EntityDto<int> input)
        {
            return base.GetAsync(input);
        }

        public override Task<CategoriesDto> UpdateAsync(CategoriesDto input)
        {
            return base.UpdateAsync(input);
        }
    }
}

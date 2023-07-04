using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using OrderingSystem.Categories.Dto;
using OrderingSystem.Entities;
using System.Threading.Tasks;

namespace OrderingSystem.Categories
{
    public class CategoriesAppService : AsyncCrudAppService<Category, CategoriesDto, int, PagedCategoriesResultRequestDto, CreateCategoriesDto, CategoriesDto>, ICategoriesAppService
    {
        public CategoriesAppService(IRepository<Category, int> repository) : base(repository)
        {

        }

        public override Task<CategoriesDto> CreateAsync(CreateCategoriesDto input)
        {
            return base.CreateAsync(input);
        }

        public override Task DeleteAsync(EntityDto<int> input)
        {
            return base.DeleteAsync(input);
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

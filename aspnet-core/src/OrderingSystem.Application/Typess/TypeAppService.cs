using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using OrderingSystem.Entities;
using OrderingSystem.Typess.Dto;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using System.Linq;
using Abp.UI;

namespace OrderingSystem.Typess
{
    public class TypeAppService : AsyncCrudAppService<Types, TypeDto, int, PagedTypeResultRequest, CreateTypeDto, TypeDto>, ITypeAppService
    {
        private readonly IRepository<Types, int> _repository;
        private readonly IRepository<Food, int> _foodrepository;

        public TypeAppService(IRepository<Types, int> repository, IRepository<Food, int> foodrepository) : base(repository)
        {
            _repository = repository;
           _foodrepository = foodrepository;
        }

        public override Task<TypeDto> CreateAsync(CreateTypeDto input)
        {
            return base.CreateAsync(input);
        }

        public override Task DeleteAsync(EntityDto<int> input)
        {
            var exist = _foodrepository.GetAll()
                .Where(x => x.TypesId == input.Id)
                .FirstOrDefault();

            if(exist == null)
            {
                return base.DeleteAsync(input);
            }
            else
            {
                throw new UserFriendlyException("Type exist in the list of foods");
            }
        }

        public override Task<PagedResultDto<TypeDto>> GetAllAsync(PagedTypeResultRequest input)
        {
            return base.GetAllAsync(input);
        }

        public override Task<TypeDto> GetAsync(EntityDto<int> input)
        {
            return base.GetAsync(input);
        }

        public override Task<TypeDto> UpdateAsync(TypeDto input)
        {
            return base.UpdateAsync(input);
        }
       
    }
}

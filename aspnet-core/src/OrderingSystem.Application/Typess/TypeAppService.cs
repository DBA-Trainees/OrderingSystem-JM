using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using OrderingSystem.Entities;
using OrderingSystem.Typess.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Typess
{
    public class TypeAppService : AsyncCrudAppService<Types, TypeDto, int, PagedTypeResultRequest, CreateTypeDto, TypeDto>, ITypeAppService
    {
        public TypeAppService(IRepository<Types, int> repository) : base(repository)
        {
        }

        public override Task<TypeDto> CreateAsync(CreateTypeDto input)
        {
            return base.CreateAsync(input);
        }

        public override Task DeleteAsync(EntityDto<int> input)
        {
            return base.DeleteAsync(input);
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

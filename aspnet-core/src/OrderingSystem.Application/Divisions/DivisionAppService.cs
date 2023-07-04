using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using OrderingSystem.Divisions.Dto;
using OrderingSystem.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Divisions
{
    public class DivisionAppService : AsyncCrudAppService<Division, DivisionDto, int, PagedDivisionResultRequest, CreateDivisionDto, DivisionDto>, IDivisionAppService
    {
        public DivisionAppService(IRepository<Division, int> repository) : base(repository)
        {
        }

        public override Task<DivisionDto> CreateAsync(CreateDivisionDto input)
        {
            return base.CreateAsync(input);
        }

        public override Task DeleteAsync(EntityDto<int> input)
        {
            return base.DeleteAsync(input);
        }

        public override Task<PagedResultDto<DivisionDto>> GetAllAsync(PagedDivisionResultRequest input)
        {
            return base.GetAllAsync(input);
        }

        public override Task<DivisionDto> GetAsync(EntityDto<int> input)
        {
            return base.GetAsync(input);
        }

        public override Task<DivisionDto> UpdateAsync(DivisionDto input)
        {
            return base.UpdateAsync(input);
        }
    }
}

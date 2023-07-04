using Abp.Application.Services;
using OrderingSystem.Divisions.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Divisions
{
    public interface IDivisionAppService : IAsyncCrudAppService <DivisionDto,int, PagedDivisionResultRequest, CreateDivisionDto, DivisionDto>
    {
    }
}

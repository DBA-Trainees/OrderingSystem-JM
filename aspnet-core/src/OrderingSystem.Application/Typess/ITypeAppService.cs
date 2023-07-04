using Abp.Application.Services;
using OrderingSystem.Typess.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Typess
{
    public interface ITypeAppService: IAsyncCrudAppService <TypeDto, int, PagedTypeResultRequest, CreateTypeDto, TypeDto>
    {
    }
}

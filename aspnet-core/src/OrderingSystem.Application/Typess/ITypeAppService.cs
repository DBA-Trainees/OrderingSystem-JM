using Abp.Application.Services;
using OrderingSystem.Typess.Dto;

namespace OrderingSystem.Typess
{
    public interface ITypeAppService: IAsyncCrudAppService <TypeDto, int, PagedTypeResultRequest, CreateTypeDto, TypeDto>
    {
    }
}

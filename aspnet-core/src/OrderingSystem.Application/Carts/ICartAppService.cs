using Abp.Application.Services;
using Abp.Application.Services.Dto;
using OrderingSystem.Carts.Dto;
using OrderingSystem.Orders.Dto;
using System.Threading.Tasks;

namespace OrderingSystem.Carts
{
    public interface ICartAppService : IAsyncCrudAppService<CartDto, int, PagedCartDtoResultRequestDto, CreateCartDto, CartDto>
    {
        Task<PagedResultDto<CartDto>> GetAllCustomerAndFood(PagedCartDtoResultRequestDto input);
        Task<PagedResultDto<CartDto>> GetAllCustomerFood();

    }
}

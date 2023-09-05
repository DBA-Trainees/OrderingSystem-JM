using Abp.Application.Services;
using Abp.Application.Services.Dto;
using OrderingSystem.Entities;
using OrderingSystem.Orders.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OrderingSystem.Orders
{
    public interface IOrderAppService : IAsyncCrudAppService <OrderDto, int, PagedOrderResultRequestDto, CreateOrderDto, OrderDto>
    {
        Task<PagedResultDto<OrderDto>> GetAllCustomerAndFood(PagedOrderResultRequestDto input);
        Task<OrderDto> Checkout(OrderDto input);
        Task<PagedResultDto<OrderDto>> GetAllOrders(PagedOrderResultRequestDto input);
        Task<Order> GetAllFoodAndStatus(int id);
    }
}

using Abp.Application.Services;
using Abp.Application.Services.Dto;
using OrderingSystem.Categories.Dto;
using OrderingSystem.Customers.Dto;
using OrderingSystem.Foods.Dto;
using OrderingSystem.Orders.Dto;
using OrderingSystem.Typess.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Orders
{
    public interface IOrderAppService : IAsyncCrudAppService <OrderDto,int, PagedOrderResultRequestDto, CreateOrderDto, OrderDto>
    {
        Task<PagedResultDto<FoodDto>> GetFood();
        Task<PagedResultDto<CustomerDto>> GetCustomer();
        Task<PagedResultDto<FoodDto>> GetCustomerAndFood(PagedFoodResultRequestDto input);


    }
}

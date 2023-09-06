using Abp.Application.Services;
using Abp.Application.Services.Dto;
using OrderingSystem.Authorization.Users;
using OrderingSystem.Customers.Dto;
using OrderingSystem.Divisions.Dto;
using OrderingSystem.Entities;
using OrderingSystem.Foods.Dto;
using OrderingSystem.Users.Dto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OrderingSystem.Customers
{
    public interface ICustomerAppService : IAsyncCrudAppService<CustomerDto, long, PagedCustomerResultRequestDto, CreateCustomerDto, CustomerDto>
    {
        Task<PagedResultDto<DivisionDto>> GetDivision();
        Task<PagedResultDto<UserDto>> GetUser();
        Task<PagedResultDto<CustomerDto>> GetAllDivisionAndUser(PagedCustomerResultRequestDto input);
        Task<Customer> GetCustomerAndUser(int id);

    }
}

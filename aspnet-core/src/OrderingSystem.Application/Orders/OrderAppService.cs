using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using OrderingSystem.Categories.Dto;
using OrderingSystem.Customers.Dto;
using OrderingSystem.Divisions.Dto;
using OrderingSystem.Entities;
using OrderingSystem.Foods.Dto;
using OrderingSystem.Orders.Dto;
using OrderingSystem.Typess.Dto;
using System.Linq;
using System.Threading.Tasks;

namespace OrderingSystem.Orders
{
    public class OrderAppService : AsyncCrudAppService<Order, OrderDto, int, PagedOrderResultRequestDto, CreateOrderDto, OrderDto>, IOrderAppService
    {
        private readonly IRepository<Order, int> _repository;
        private readonly IRepository<Customer, int> _customerrepository;
        private readonly IRepository<Food, int> _foodrepository;
        public OrderAppService(IRepository<Order, int> repository, IRepository<Customer, int> customerRepository, IRepository<Food, int> foodrepository) : base(repository)
        {
            _repository = repository;
            _customerrepository = customerRepository;
            _foodrepository = foodrepository;
        }

        public override Task<OrderDto> CreateAsync(CreateOrderDto input)
        {
            return base.CreateAsync(input);
        }

        public override Task DeleteAsync(EntityDto<int> input)
        {
            return base.DeleteAsync(input);
        }

        public override Task<PagedResultDto<OrderDto>> GetAllAsync(PagedOrderResultRequestDto input)
        {
            return base.GetAllAsync(input);
        }

        public override Task<OrderDto> GetAsync(EntityDto<int> input)
        {
            return base.GetAsync(input);    
        }

        public override Task<OrderDto> UpdateAsync(OrderDto input)
        {
            return base.UpdateAsync(input);
        }

        public async Task<PagedResultDto<CustomerDto>> GetCustomer()
        {
            var query = await _customerrepository.GetAll()
                .Select(x => ObjectMapper.Map<CustomerDto>(x))
                .ToListAsync();

            return new PagedResultDto<CustomerDto>(query.Count(), query);
        }
        public async Task<PagedResultDto<FoodDto>> GetFood()
        {
            var query = await _customerrepository.GetAll()
                .Select(x => ObjectMapper.Map<FoodDto>(x))
                .ToListAsync();

            return new PagedResultDto<FoodDto>(query.Count(), query);
        }

        public async Task<PagedResultDto<FoodDto>> GetCustomerAndFood(PagedFoodResultRequestDto input)
        {
           
            var order = await _repository.GetAll()
                .Include(x => x.CustomerId)
                .Include(x => x.FoodId)
                .Select(x => ObjectMapper.Map<FoodDto>(x))
                .ToListAsync();

            return new PagedResultDto<FoodDto>(order.Count(), order);
        }

    }
}

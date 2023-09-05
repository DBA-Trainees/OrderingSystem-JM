using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using Microsoft.EntityFrameworkCore;
using OrderingSystem.Divisions.Dto;
using OrderingSystem.Entities;
using OrderingSystem.Foods.Dto;
using OrderingSystem.Orders.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderingSystem.Orders
{
    public class OrderAppService : AsyncCrudAppService<Order, OrderDto, int, PagedOrderResultRequestDto, CreateOrderDto, OrderDto>, IOrderAppService
    {
        private readonly IRepository<Order, int> _repository;
        private readonly IRepository<Food, int> _foodrepository;

        public OrderAppService(IRepository<Order, int> repository, IRepository<Food, int> foodrepository) : base(repository)
        {
            _repository = repository;
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

        public async Task<PagedResultDto<OrderDto>> GetAllCustomerAndFood(PagedOrderResultRequestDto input)
        {
            var order = await _repository.GetAll()
                .Include(x => x.Customer)
                .Include(x => x.Food)
                .Where(x => x.CustomerId == x.CustomerId && x.Status == 1)
                .Select(x => ObjectMapper.Map<OrderDto>(x))
                .ToListAsync();

            return new PagedResultDto<OrderDto>(order.Count(), order);
        }
        public async Task<OrderDto> Checkout(OrderDto input)
        {
            var order = new Order();
            var ordernumber = Guid.NewGuid();

            foreach (var item in input.Orders)
            {
                order = ObjectMapper.Map<Order>(item);
                order.Id = item.Id;
                order.DateOrdered = item.DateOrdered.ToLocalTime();
                order.OrderNumber = ordernumber;
                await _repository.UpdateAsync(order);

                var food = await _foodrepository.GetAsync(item.FoodId);
                food.Qty -= order.Qty;
                await _foodrepository.UpdateAsync(food);

            }
            return base.MapToEntityDto(order);
        }

        public async Task<PagedResultDto<OrderDto>> GetAllOrders(PagedOrderResultRequestDto input)
        {
            var order = await _repository.GetAll()
                .Include(x => x.Customer)
                .Include(x => x.Food)
                .Select(x => ObjectMapper.Map<OrderDto>(x))
                .ToListAsync();

            return new PagedResultDto<OrderDto>(order.Count(), order);
        }
     
        public async Task<Order> GetAllFoodAndStatus(int id)
        {
            var order = await _repository.GetAll()
                .Include(x => x.Food)
                .Where(x => x.Food.Id == id)
                .Select(x => ObjectMapper.Map<Order>(x))
                .FirstOrDefaultAsync();

            return order;

        }
    }
}

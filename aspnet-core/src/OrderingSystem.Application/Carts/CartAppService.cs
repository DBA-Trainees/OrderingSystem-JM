using Abp.Application.Services;
using OrderingSystem.Entities;
using OrderingSystem.Orders.Dto;
using OrderingSystem.Orders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OrderingSystem.Carts.Dto;
using Abp.Domain.Repositories;
using Abp.Application.Services.Dto;
using OrderingSystem.Foods.Dto;
using Microsoft.EntityFrameworkCore;
using OrderingSystem.Categories.Dto;
using OrderingSystem.Typess.Dto;

namespace OrderingSystem.Carts
{
    public class CartAppService : AsyncCrudAppService<Cart, CartDto, int, PagedCartDtoResultRequestDto, CreateCartDto, CartDto>, ICartAppService
    {
        private readonly IRepository<Cart, int> _repository;
        private readonly IRepository<Order, int> _orderrepository;
        private readonly IRepository<Food, int> _foodrepository;
        private readonly IRepository<Category, int> _categoryrepository;
        private readonly IRepository<Types, int> _typesrepository;


        public CartAppService(IRepository<Cart, int> repository, IRepository<Order, int> orderrepository, IRepository<Food, int> foodrepository, IRepository<Category, int> categoryrepository, IRepository<Types, int> typesrepository) : base(repository)
        {
            _repository = repository;
            _orderrepository = orderrepository;
            _foodrepository = foodrepository;
            _categoryrepository = categoryrepository;
            _typesrepository = typesrepository;
        }

        public override Task<CartDto> CreateAsync(CreateCartDto input)
        {
            return base.CreateAsync(input);
        }

        public override Task DeleteAsync(EntityDto<int> input)
        {
            return base.DeleteAsync(input);
        }

        public override Task<PagedResultDto<CartDto>> GetAllAsync(PagedCartDtoResultRequestDto input)
        {
            return base.GetAllAsync(input);
        }

        public override Task<CartDto> GetAsync(EntityDto<int> input)
        {
            return base.GetAsync(input);
        }

        public override Task<CartDto> UpdateAsync(CartDto input)
        {
            return base.UpdateAsync(input);
        }
        public async Task<PagedResultDto<CartDto>> GetAllCustomerAndFood(PagedCartDtoResultRequestDto input)
        {

            var cart = await _repository.GetAll()
                .Include(x => x.Customer)
                .Include(x => x.Food)
                .Select(x => ObjectMapper.Map<CartDto>(x))
                .ToListAsync();

            return new PagedResultDto<CartDto>(cart.Count(), cart);
        }


        //public async Task<PagedResultDto<CategoriesDto>> GetCategory()
        //{
        //    //To view the innerjoined data in dropdown
        //    var query = await _categoryrepository.GetAll()
        //        .Select(x => ObjectMapper.Map<CategoriesDto>(x))
        //        .ToListAsync();

        //    return new PagedResultDto<CategoriesDto>(query.Count(), query);
        //}

        //public async Task<PagedResultDto<TypeDto>> GetType()
        //{
        //    var type = await _typesrepository.GetAll()
        //        .Select(x => ObjectMapper.Map<TypeDto>(x))
        //        .ToListAsync();

        //    return new PagedResultDto<TypeDto>(type.Count(), type);
        //}

        public async Task<PagedResultDto<CartDto>> GetAllCustomerFood()
        {
            var cart = await _repository.GetAll()
                .Include(x => x.Customer)
                .Include(x => x.Food)
                .Select(x => ObjectMapper.Map<CartDto>(x))
                .ToListAsync();

            return new PagedResultDto<CartDto>(cart.Count(), cart);
        }
    }
}

﻿using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using Microsoft.EntityFrameworkCore;
using OrderingSystem.Authorization.Users;
using OrderingSystem.Customers.Dto;
using OrderingSystem.Divisions.Dto;
using OrderingSystem.Entities;
using OrderingSystem.Users.Dto;
using System.Linq;
using System.Threading.Tasks;

namespace OrderingSystem.Customers
{
    public class CustomerAppService : AsyncCrudAppService<Customer, CustomerDto, long, PagedCustomerResultRequestDto, CreateCustomerDto, CustomerDto>, ICustomerAppService
    {
        private readonly IRepository<Division, int> _divisionRepository;
        private readonly IRepository<Order, int> _orderRepository;
        private readonly IRepository<Customer, long> _repository;
        private readonly IRepository<User, long> _userrepository;
        public CustomerAppService(IRepository<Customer, long> repository, IRepository<Division, int> divisionRepository, IRepository<User, long> userrepository, IRepository<Order, int> orderRepository) : base(repository)
        {
            _divisionRepository = divisionRepository;
            _repository = repository;
            _userrepository = userrepository;
            _orderRepository = orderRepository;
        }


        public override Task<CustomerDto> CreateAsync(CreateCustomerDto input)
        {
            return base.CreateAsync(input);
        }

        public override Task DeleteAsync(EntityDto<long> input)
        {
            var exist = _orderRepository.GetAll()
              .Where(x => x.CustomerId == input.Id)
              .FirstOrDefault();

            if (exist == null)
            {
                return base.DeleteAsync(input);
            }
            else
            {
                throw new UserFriendlyException("Customer exist");
            }
        }

        public override Task<PagedResultDto<CustomerDto>> GetAllAsync(PagedCustomerResultRequestDto input)
        {
            return base.GetAllAsync(input);
        }

        public override Task<CustomerDto> GetAsync(EntityDto<long> input)
        {
            return base.GetAsync(input);
        }

        public override Task<CustomerDto> UpdateAsync(CustomerDto input)
        {
            return base.UpdateAsync(input);
        }


        public async Task<PagedResultDto<DivisionDto>> GetDivision()
        {
            var query = await _divisionRepository.GetAll()
                .Select(x => ObjectMapper.Map<DivisionDto>(x))
                .ToListAsync();

            return new PagedResultDto<DivisionDto>(query.Count(), query);
        }

        public async Task<PagedResultDto<UserDto>> GetUser()
        {
            var query = await _userrepository.GetAll()
                .Select(x => ObjectMapper.Map<UserDto>(x))
                .ToListAsync();

            return new PagedResultDto<UserDto>(query.Count(), query);
        }

        public async Task<PagedResultDto<CustomerDto>> GetAllDivisionAndUser(PagedCustomerResultRequestDto input)
        {
            var customer = await _repository.GetAll()
                .Include(x => x.Division)
                .Include(x => x.User)
                .Select(x => ObjectMapper.Map<CustomerDto>(x))
                .ToListAsync();

            return new PagedResultDto<CustomerDto>(customer.Count(), customer);
        }
        public async Task<Customer> GetCustomerAndUser(int id)  
        {
            var c = await _repository.GetAll()
                .Where(x => x.UserId == id)
                .Select(x => ObjectMapper.Map<Customer>(x))
                .FirstOrDefaultAsync();

            return c;

        }
    }

}

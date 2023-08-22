using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
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
    public class CustomerAppService : AsyncCrudAppService<Customer, CustomerDto, int, PagedCustomerResultRequestDto, CreateCustomerDto, CustomerDto>, ICustomerAppService
    {
        private readonly IRepository<Division, int> _divisionRepository;
        private readonly IRepository<Customer, int> _repository;
        private readonly IRepository<User, long> _userrepository;
        public CustomerAppService(IRepository<Customer, int> repository, IRepository<Division, int> divisionRepository) : base(repository)
        {
            _divisionRepository = divisionRepository;
            _repository = repository;
        }
      

        public override Task<CustomerDto> CreateAsync(CreateCustomerDto input)
        {
            return base.CreateAsync(input);
        }

        public override Task DeleteAsync(EntityDto<int> input)
        {
            return base.DeleteAsync(input);
        }

        public override Task<PagedResultDto<CustomerDto>> GetAllAsync(PagedCustomerResultRequestDto input)
        {
            return base.GetAllAsync(input);
        }

        public override Task<CustomerDto> GetAsync(EntityDto<int> input)
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

        public async Task<PagedResultDto<CustomerDto>> GetAllCustomerWithDivision(PagedCustomerResultRequestDto input)
        {
            var customer = await _repository.GetAll()
                .Include(x => x.Division)
                .Select(x => ObjectMapper.Map<CustomerDto>(x))
                .ToListAsync();

            return new PagedResultDto<CustomerDto>(customer.Count(), customer);
        }
    }

}

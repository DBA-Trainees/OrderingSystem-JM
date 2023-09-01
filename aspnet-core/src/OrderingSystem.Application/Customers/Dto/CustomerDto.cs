using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderingSystem.Divisions.Dto;
using OrderingSystem.Entities;
using OrderingSystem.Users.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Customers.Dto
{
    [AutoMapFrom(typeof(Customer))]
    [AutoMapTo(typeof(Customer))]   
    public class CustomerDto : EntityDto<int>
    {
        public string Name { get; set; }
        public int DivisionId { get; set; }
        public DivisionDto Division { get; set; }
        public int UserId { get; set; }
        public UserDto User { get; set; }
    }
}

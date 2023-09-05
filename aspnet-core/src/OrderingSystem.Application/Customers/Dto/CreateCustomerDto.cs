using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderingSystem.Entities;
using System;

namespace OrderingSystem.Customers.Dto
{
    [AutoMapFrom(typeof(CustomerDto))]
    [AutoMapTo(typeof(Customer))]
    public class CreateCustomerDto: EntityDto<long>
    {
        public string Name { get; set; }
        public int DivisionId { get; set; } //FK
        public int UserId { get; set; } //FK


    }
}

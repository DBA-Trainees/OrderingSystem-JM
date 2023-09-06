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
        public int DivisionId { get; set; } //FK
        public long UserId { get; set; } //FK


    }
}

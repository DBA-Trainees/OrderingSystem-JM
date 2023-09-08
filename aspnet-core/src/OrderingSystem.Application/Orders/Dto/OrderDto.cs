using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderingSystem.Authorization.Users;
using OrderingSystem.Customers.Dto;
using OrderingSystem.Entities;
using OrderingSystem.Foods.Dto;
using System;
using System.Collections.Generic;

namespace OrderingSystem.Orders.Dto
{
    [AutoMapFrom(typeof(Order))]
    [AutoMapTo(typeof(Order))]   
    public class OrderDto : EntityDto<int>
    {
        public long CustomerId { get; set; }
        public CustomerDto Customer { get; set; }
        public int FoodId { get; set; }
        public FoodDto Food { get; set; }
        public string Size { get; set; }
        public int Qty { get; set; }
        public int? Status { get; set; }
        public double? Amount { get; set; }
        public Guid? OrderNumber { get; set; }
        public List<OrderDto> Orders { get; set; }
        public DateTime DateOrdered { get; set; }
    }
}

using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderingSystem.Entities;
using System;
using System.Collections.Generic;

namespace OrderingSystem.Orders.Dto
{
    [AutoMapFrom(typeof(Order))]
    [AutoMapTo(typeof(Order))]   
    public class OrderDto : EntityDto<int>
    {
        public int CustomerId { get; set; }
        public Customer Customer { get; set; }
        public int FoodId { get; set; }
        public Food Food { get; set; }
        public string Size { get; set; }
        public int Qty { get; set; }
        public int? Status { get; set; }
        public Guid? OrderNumber { get; set; }
        public List<OrderDto> Orders { get; set; }
        public DateTime DateOrdered { get; set; }
    }
}

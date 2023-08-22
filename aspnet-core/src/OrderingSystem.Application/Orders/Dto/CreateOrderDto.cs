using Abp.AutoMapper;
using OrderingSystem.Entities;
using System;

namespace OrderingSystem.Orders.Dto
{
   // [AutoMapFrom(typeof(OrderDto))]
    [AutoMapTo(typeof(Order))]
    public class CreateOrderDto
    {
        public int CustomerId { get; set; }
        public int FoodId { get; set; }
        public int CartId { get; set; }
        public int Status { get; set; }
        public DateTime DateOrdered { get; set; }

    }
}

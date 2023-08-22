using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderingSystem.Entities;
using System;

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
        public int CartId { get; set; }
        public Cart Cart { get; set; }
        public int Status { get; set; }
        public DateTime DateOrdered { get; set; }
    }
}

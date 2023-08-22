using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderingSystem.Entities;
using System;

namespace OrderingSystem.Carts.Dto
{
    [AutoMapFrom(typeof(Cart))]
    [AutoMapTo(typeof(Cart))]   
    public class CartDto : EntityDto<int>
    {
        public Customer Customer { get; set; }
        public int? CustomerId { get; set; }
        public Food Food { get; set; }
        public int? FoodId { get; set; }
        public int Status { get; set; }
        public DateTime DateOrdered { get; set; }


    }
}

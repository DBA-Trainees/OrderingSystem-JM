using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderingSystem.Entities;
using System;

namespace OrderingSystem.Carts.Dto
{
    [AutoMapFrom(typeof(CartDto))]
    [AutoMapTo(typeof(Cart))]
    public class CreateCartDto : EntityDto<int>
    {
        public int? CustomerId { get; set; }
        public int? FoodId { get; set; }
        public int? CartId { get; set; }
        public int? OrderNumber { get; set; }
        public int Status { get; set; }
        public DateTime DateOrdered { get; set; }

    }
}

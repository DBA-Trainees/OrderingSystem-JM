using Abp.AutoMapper;
using OrderingSystem.Entities;
using Abp.Application.Services.Dto;

namespace OrderingSystem.Typess.Dto
{
    [AutoMapFrom(typeof(Types))]
    [AutoMapTo(typeof(Types))]
    public class TypeDto : EntityDto<int>
    {
        public string Name { get; set; }
    }
}

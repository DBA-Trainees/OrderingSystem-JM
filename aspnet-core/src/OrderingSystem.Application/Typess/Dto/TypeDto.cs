using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using OrderingSystem.Entities;
using System.Threading.Tasks;
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

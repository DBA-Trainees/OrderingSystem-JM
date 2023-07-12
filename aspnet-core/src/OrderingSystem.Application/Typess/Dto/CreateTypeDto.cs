using Abp.AutoMapper;
using OrderingSystem.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderingSystem.Typess.Dto
{
    [AutoMapFrom(typeof(TypeDto))]
    [AutoMapTo(typeof(Types))]
    public class CreateTypeDto
    {
        public string Name { get; set; }
    }
}

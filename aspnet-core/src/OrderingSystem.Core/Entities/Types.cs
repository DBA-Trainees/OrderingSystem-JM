
using Abp.Domain.Entities.Auditing;

namespace OrderingSystem.Entities
{
    public class Types : FullAuditedEntity<int>
    {
        public string Name { get; set; }
       

    }
}

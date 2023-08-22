using Abp.Domain.Entities.Auditing;
using OrderingSystem.Authorization.Users;

namespace OrderingSystem.Entities
{
    public class Customer: FullAuditedEntity<int>
    {
        public string Name { get; set; }
        public int? DivisionId { get; set; }
        public Division Division { get; set; }
    }
}

using Abp.Application.Services.Dto;

namespace OrderingSystem.Typess.Dto
{
    public class PagedTypeResultRequest : PagedResultRequestDto
    {
        public string Keyword { get; set; }
        public bool? IsActive { get; set; }
    }
}

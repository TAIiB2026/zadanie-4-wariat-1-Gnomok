using WebAPI.Models;

namespace WebAPI.Interfaces;

public interface IGetDataService
{
    IEnumerable<ProduktDto> GetAll();
    ProduktDto? GetById(int id);
}

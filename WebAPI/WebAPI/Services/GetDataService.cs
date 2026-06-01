using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Services;

public class GetDataService : IGetDataService
{
    private readonly List<ProduktDto> products =
    [
        new() { Id = 1, Nazwa = "Arbuz", Cena = 5.0m, DataWaznosci = new DateTime(2026, 6, 10) },
        new() { Id = 2, Nazwa = "Banan", Cena = 7.5m, DataWaznosci = new DateTime(2026, 7, 15) },
        new() { Id = 3, Nazwa = "Jabłko", Cena = 4.2m, DataWaznosci = new DateTime(2026, 8, 20) },
        new() { Id = 4, Nazwa = "Pomarańcza", Cena = 6.8m, DataWaznosci = new DateTime(2026, 9, 5) },
        new() { Id = 5, Nazwa = "Gruszka", Cena = 5.9m, DataWaznosci = new DateTime(2026, 10, 12) }
    ];

    public IEnumerable<ProduktDto> GetAll() => products;

    public ProduktDto? GetById(int id) => products.FirstOrDefault(x => x.Id == id);
}

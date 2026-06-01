using WebAPI.Dtos;

namespace WebAPI.Services
{
    public class ProduktService
    {
        private static List<ProduktDto> _produkty = new List<ProduktDto>
        {
            new ProduktDto { Id = 1, Nazwa = "Arbuz", Cena = 5.0m, DataWaznosci = new DateTime(2026, 6, 10) },
            new ProduktDto { Id = 2, Nazwa = "Banan", Cena = 7.5m, DataWaznosci = new DateTime(2026, 7, 15) },
            new ProduktDto { Id = 3, Nazwa = "Jabłko", Cena = 4.2m, DataWaznosci = new DateTime(2026, 8, 20) },
            new ProduktDto { Id = 4, Nazwa = "Pomarańcza", Cena = 6.8m, DataWaznosci = new DateTime(2026, 9, 5) },
            new ProduktDto { Id = 5, Nazwa = "Gruszka", Cena = 5.9m, DataWaznosci = new DateTime(2026, 10, 12) }
        };
        private static int _nextId = 6;

        public PaginatedResponse<ProduktDto> Get(int pageNumber = 1, int pageSize = 5, string nazwaFilter = "")
        {
            var filtered = _produkty.AsEnumerable();

            if (!string.IsNullOrWhiteSpace(nazwaFilter))
            {
                filtered = filtered.Where(p => p.Nazwa.ToLower().Contains(nazwaFilter.ToLower()));
            }

            var totalCount = filtered.Count();
            var skip = (pageNumber - 1) * pageSize;
            var paged = filtered.Skip(skip).Take(pageSize).ToList();

            return new PaginatedResponse<ProduktDto>
            {
                Data = paged,
                TotalCount = totalCount,
                PageNumber = pageNumber,
                PageSize = pageSize
            };
        }

        public ProduktDto GetByID(int id)
        {
            var produkt = _produkty.FirstOrDefault(p => p.Id == id);
            if (produkt == null)
                throw new KeyNotFoundException($"Produkt o ID {id} nie znaleziony.");
            return produkt;
        }

        public bool Post(string nazwa, decimal cena, DateTime data)
        {
            _produkty.Add(new ProduktDto
            {
                Id = _nextId++,
                Nazwa = nazwa,
                Cena = cena,
                DataWaznosci = data
            });
            return true;
        }

        public bool Put(int id, string nazwa, decimal cena, DateTime data)
        {
            var produkt = _produkty.FirstOrDefault(p => p.Id == id);
            if (produkt == null)
                return false;

            produkt.Nazwa = nazwa;
            produkt.Cena = cena;
            produkt.DataWaznosci = data;
            return true;
        }

        public bool Delete(int id)
        {
            var produkt = _produkty.FirstOrDefault(p => p.Id == id);
            if (produkt == null)
                return false;

            _produkty.Remove(produkt);
            return true;
        }
    }
}
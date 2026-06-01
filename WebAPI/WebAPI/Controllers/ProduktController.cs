// WebAPI/WebAPI/Controllers/ProduktyController.cs
using Microsoft.AspNetCore.Mvc;
using WebAPI.Services;
using WebAPI.Dtos;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProduktyController : ControllerBase
    {
        private readonly ProduktService _service;

        public ProduktyController(ProduktService service)
        {
            _service = service;
        }

        [HttpGet]
        public ActionResult<PaginatedResponse<ProduktDto>> Get(
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 5,
            [FromQuery] string nazwaFilter = "")
        {
            try
            {
                var result = _service.Get(pageNumber, pageSize, nazwaFilter);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public ActionResult<ProduktDto> GetByID(int id)
        {
            try
            {
                return Ok(_service.GetByID(id));
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        [HttpPost]
        public ActionResult<bool> Post([FromBody] ProduktDto dto)
        {
            try
            {
                var result = _service.Post(dto.Nazwa, dto.Cena, dto.DataWaznosci);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public ActionResult<bool> Put(int id, [FromBody] ProduktDto dto)
        {
            try
            {
                var result = _service.Put(id, dto.Nazwa, dto.Cena, dto.DataWaznosci);
                return result ? Ok(result) : NotFound(new { message = $"Produkt o ID {id} nie znaleziony." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public ActionResult<bool> Delete(int id)
        {
            try
            {
                var result = _service.Delete(id);
                return result ? Ok(result) : NotFound(new { message = $"Produkt o ID {id} nie znaleziony." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
    }
}
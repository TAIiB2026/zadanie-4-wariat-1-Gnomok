using Microsoft.AspNetCore.Mvc;
using WebAPI.Interfaces;
using WebAPI.Models;

namespace WebAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController(IGetDataService getDataService) : ControllerBase
{
    [HttpGet]
    public ActionResult<IEnumerable<ProduktDto>> GetAll()
    {
        return Ok(getDataService.GetAll());
    }

    [HttpGet("{id:int}")]
    public ActionResult<ProduktDto> GetById(int id)
    {
        var product = getDataService.GetById(id);
        if (product is null)
        {
            return NotFound();
        }

        return Ok(product);
    }
}

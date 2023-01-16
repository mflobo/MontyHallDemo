using Microsoft.AspNetCore.Mvc;
using MontyHallDemo.Models;

namespace MontyHallDemo.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SimulationController : ControllerBase               
    {   
        [HttpGet("{numOfSimulations:int}/{switchDoors:bool}")]
        public SimulationModel[] Get(int numOfSimulations, bool switchDoors)
        {
            Random rnd = new Random();

            List<SimulationModel> simulations = new List<SimulationModel>();

            for (int i = 0; i < numOfSimulations; i++)
            {
                int chosen = rnd.Next(1, 4);
                int winning = rnd.Next(1, 4);
                bool won;
                if (chosen == winning)
                {
                    if (switchDoors)
                    {
                        won = false;
                    }
                    else
                    {
                        won = true;
                    }
                }
                else
                {
                    if (switchDoors)
                    {
                        won = true;
                    }
                    else
                    {
                        won = false;
                    }
                }

                simulations.Add(new SimulationModel()
                {
                    ChosenDoor = chosen,
                    WinningDoor = winning,
                    Won = won,
                });
            }

            return simulations.ToArray();
        }
    }
}
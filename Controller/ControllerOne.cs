using Microsoft.AspNetCore.Mvc;
using New_RPSLSP__project.Model;
using New_RPSLSP__project.Service;

namespace New_RPSLSP__project.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class ControllerOne : ControllerBase
    {
        private readonly ServiceOne serviceOne;

        public ControllerOne()
        {
            serviceOne = new ServiceOne();
        }

        [HttpGet("cpu-move")]
        public IActionResult GetCpuMove()
        {
            var move = serviceOne.GenerateCpuMove();
            return Ok(new { cpuMove = move });
        }

        [HttpPost("play")]
        public IActionResult PlayRound([FromQuery] string playerMove)
        {
            playerMove = playerMove.ToLower();

            if (!GameRules.AvailableMoves.Contains(playerMove))
                return BadRequest("Invalid move.");

            var result = serviceOne.PlaySingleRound(playerMove);
            return Ok(result);
        }

        [HttpGet("rules")]
        public IActionResult GetRules()
        {
            return Ok(GameRules.WinMap);
        }
    }
}

    

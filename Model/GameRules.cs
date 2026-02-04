using System.Collections.Generic;
using System.Linq;

namespace New_RPSLSP__project.Model
{
    public static class GameRules
    {
        public static readonly Dictionary<string, Dictionary<string, string>> WinMap =
            new()
            {
                ["rock"] = new() { ["scissors"] = "Rock crushes Scissors", ["lizard"] = "Rock crushes Lizard" },
                ["paper"] = new() { ["rock"] = "Paper covers Rock", ["spock"] = "Paper disproves Spock" },
                ["scissors"] = new() { ["paper"] = "Scissors cuts Paper", ["lizard"] = "Scissors decapitates Lizard" },
                ["lizard"] = new() { ["paper"] = "Lizard eats Paper", ["spock"] = "Lizard poisons Spock" },
                ["spock"] = new() { ["scissors"] = "Spock smashes Scissors", ["rock"] = "Spock vaporizes Rock" }
            };

        public static List<string> AvailableMoves => WinMap.Keys.ToList();
    }
}

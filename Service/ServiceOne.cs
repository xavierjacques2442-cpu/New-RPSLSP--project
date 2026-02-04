using System;
using New_RPSLSP__project.Model;

namespace New_RPSLSP__project.Service
{
    public class ServiceOne
    {
        private static readonly Random random = new();

        public string GenerateCpuMove()
        {
            var moves = GameRules.AvailableMoves;
            return moves[random.Next(moves.Count)];
        }

        public RoundResualt PlaySingleRound(string playerMove)
        {
            var cpuMove = GenerateCpuMove();

            if (playerMove == cpuMove)
            {
                return new RoundResualt
                {
                    PlayMove = playerMove,
                    CpuMove = cpuMove,
                    outCome = "tie",
                    Explantion = $"Both selected {playerMove}"
                };
            }

            if (GameRules.WinMap[playerMove].ContainsKey(cpuMove))
            {
                return new RoundResualt
                {
                    PlayMove = playerMove,
                    CpuMove = cpuMove,
                    outCome = "win",
                    Explantion = GameRules.WinMap[playerMove][cpuMove]
                };
            }

            return new RoundResualt
            {
                PlayMove = playerMove,
                CpuMove = cpuMove,
                outCome = "lose",
                Explantion = GameRules.WinMap[cpuMove][playerMove]
            };
        }
    }
}


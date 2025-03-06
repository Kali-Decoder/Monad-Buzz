import Bet, { IBet } from '../dao/bet';
import Market, { MarketStatus, MarketType } from '../dao/market';
import { BetCreateParams, UserPortfolio } from '../utils/types';
import { createTransaction } from './transactionService';
import { TransactionType } from '../dao/transaction';

export const placeBet = async (params: BetCreateParams): Promise<IBet> => {
  const { market: marketId, user, amount, targetScore } = params;
  // Validate market
  const market = await Market.findById(marketId);
  if (!market) throw new Error('Market not found');
  if (market.status !== MarketStatus.ACTIVE) throw new Error('Market is not active');
  if (new Date() >= market.endTime) throw new Error('Market has ended');

  // Create bet
  const betData: any = {
    market: marketId,
    user,
    amount,
    targetScore,
    claimedAmount: 0, // Default claimed amount
    claimed: false, // Default claim status
  };
  const bet = new Bet(betData);
  // Update market liquidity
  market.totalLiquidity += amount;
  await market.save();
  return await bet.save();
};
export const getUserBets = async (userAddress: string): Promise<IBet[]> => {
  console.log("hello")
  return await Bet.find({ user: userAddress })
    .populate('market')
    .sort({ createdAt: -1 });
};

export const getUserPortfolio = async (userAddress: string):  Promise<void> => {
  // const bets = await Bet.find({ user: userAddress });
  
  // const portfolio: UserPortfolio = {
  //   totalBets: bets.length,
  //   activeBets: bets.filter(b => b.status === BetStatus.ACTIVE).length,
  //   wonBets: bets.filter(b => b.status === BetStatus.WON).length,
  //   lostBets: bets.filter(b => b.status === BetStatus.LOST).length,
  //   totalAmountBet: bets.reduce((sum, bet) => sum + bet.amount, 0),
  //   totalWinnings: bets
  //     .filter(b => b.status === BetStatus.WON)
  //     .reduce((sum, bet) => sum + (bet.actualPayout || 0), 0),
  //   totalLosses: bets
  //     .filter(b => b.status === BetStatus.LOST)
  //     .reduce((sum, bet) => sum + bet.amount, 0),
  //   netProfit: 0, // Will calculate below
  // };
  
  // portfolio.netProfit = portfolio.totalWinnings - portfolio.totalLosses;

  // return;
};

export const resolveBets = async (
    marketId: string,
    outcome: string,
    outcomeValue?: number
  ): Promise<void> => {
    // const market = await Market.findById(marketId);
    // if (!market) throw new Error('Market not found');
    // if (market.status !== MarketStatus.RESOLVED) throw new Error('Market not resolved');
    
    // const bets = await Bet.find({ market: marketId, status: BetStatus.ACTIVE });
    
    // // Calculate total pool sizes
    // const totalPool = market.totalLiquidity;
    // let winningPool = 0;
    
    // if (market.type === MarketType.BINARY) {
    //   winningPool = outcome === 'yes' ? market.yesPool : market.noPool;
    // } else if (market.type === MarketType.RANGE && outcomeValue !== undefined) {
    //   const winningRange = market.ranges?.find(
    //     (r) => outcomeValue >= r.min && outcomeValue <= r.max
    //   );
    //   winningPool = winningRange?.pool || 0;
    // }
    
    // for (const bet of bets) {
    //   // Determine if bet won
    //   let won = false;
      
    //   if (market.type === MarketType.BINARY) {
    //     won = (bet.position === BetPosition.YES && outcome === 'yes') ||
    //           (bet.position === BetPosition.NO && outcome === 'no');
    //   } else if (market.type === MarketType.RANGE && outcomeValue !== undefined) {
    //     won = bet.rangeMin !== undefined && 
    //           bet.rangeMax !== undefined && 
    //           outcomeValue >= bet.rangeMin && 
    //           outcomeValue <= bet.rangeMax;
    //   }
      
    //   // Update bet status
    //   bet.status = won ? BetStatus.WON : BetStatus.LOST;
    //   bet.resolvedAt = new Date();
      
    //   // Calculate actual payout for winning bets
    //   if (won) {
    //     if (winningPool > 0) {
    //       // Winners split the entire pool proportionally to their contribution
    //       bet.actualPayout = (bet.amount / winningPool) * totalPool;
    //     } else {
    //       // Edge case: if no bets in winning pool, return original amount
    //       bet.actualPayout = bet.amount;
    //     }
    //   } else {
    //     bet.actualPayout = 0;
    //   }
      
    //   await bet.save();
      
    //   // Record a transaction for claiming winnings if won
    //   if (won && bet.actualPayout > 0) {
    //     await createTransaction(
    //       bet.user,
    //       TransactionType.CLAIM_WINNINGS,
    //       bet.actualPayout,
    //       `auto-${market._id}-${bet._id}`, // Placeholder tx hash
    //       market._id.toString(),
    //       bet._id.toString()
    //     );
    //   }
    // }
  };

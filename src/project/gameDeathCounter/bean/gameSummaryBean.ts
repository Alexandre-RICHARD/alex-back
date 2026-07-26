export type GameSummaryBean = {
	id: number;
	name: string;
	startedAt: Date;
	endedAt: Date | null;
	totalDeath: number;
};

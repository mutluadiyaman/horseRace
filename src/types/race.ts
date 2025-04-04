export interface Horse {
    id: number;
    name: string;
    color: string;
    condition: number;
    position: number;
}

export interface Round {
    round: number;
    distance: number;
    participants: Horse[];
}

export interface RaceResult {
    round: number;
    distance: number;
    result: Horse[];
}

export interface RaceState {
    horses: Horse[];
    schedule: Round[];
    results: RaceResult[];
    isRacing: boolean;
    currentRound: Round | null;
    runningHorses: Horse[];
}

export interface RoundPayload {
    round: number;
    distance: number;
    participants: (Horse & { time: number; position: number })[];
}
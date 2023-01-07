export interface RawDayZResponse {
  [key: string]: {
    status: {
      players: number;
      slots: number;
      queue: { size: number };
    };

    environment: {
      time: string;
      time_acceleration: {
        general: number;
        night: number;
      };
    };

    host: {
      address: string;
      game_port: number;
      query_port: number;
    };

    map: string;
  }
}

export interface DayZResponse {
  status: {
    players: number;
    slots: number;
    queue: number;
  };

  environment: {
    map: string;
    time: string;
    acceleration: {
      day: number;
      night: number;
    };
  };

  host: {
    address: string;
    gamePort: number;
    queryPort: number;
  };
}
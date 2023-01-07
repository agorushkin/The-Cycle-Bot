export const dayZFormatter = {
  players: ({ players, queue, slots }: { [ key: string ]: number }) => {
    return `${ players }${ queue ? '(' + queue + ')' : '' }/${ slots }`;
  },

  time: ({ time, acceleration }: { time: string, acceleration: { day: number, night: number }, [ key: string ]: unknown }, short: boolean) => {
    const hours = +time.split(':')[0];

    const isDayTime = hours >= 6 && hours <= 21;

    const accelerationString = short ? ` - ${ isDayTime ? acceleration.day : acceleration.night }x` : '';

    return `${ time }${ accelerationString } ${ isDayTime ? 'Day' : 'Night' }`;
  },

  address: ({ address, gamePort, queryPort }: { address: string, gamePort: number, queryPort: number }, type: 'game' | 'query') => {
    return `${ address } : ${ type === 'game' ? gamePort : queryPort }`;
  },

  map: (map: string) => {
    return ({
      [ map ]: map,
      chernarusplus: 'Chernarus',
      enoch: 'Livonia',
    })[ map ];
  },
};
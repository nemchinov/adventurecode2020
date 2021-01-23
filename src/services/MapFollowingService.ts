enum MapTypes {
  TREE = '#',
  FREE_CELL = '.',
};

export type Step = {
  right: number;
  down: number;
};

export type StartPosition = {
  X: number;
  Y: number;
}

class MapFollowingService {
  public getTreesCount(map: string[], step: Step, startPosition: StartPosition) {
    const parsedMap = map.map((row) => row.split(''));
    let count = 0;
    let currentPositionX = startPosition.X;
    let currentPositionY = startPosition.Y;

    while(currentPositionY < map.length) {
      if (parsedMap[currentPositionY][currentPositionX] === MapTypes.TREE) {
        count++;
      }

      currentPositionY += step.down;
      currentPositionX = (currentPositionX + step.right) % parsedMap[0].length;
    };

    return count;
  }
}

export default new MapFollowingService();
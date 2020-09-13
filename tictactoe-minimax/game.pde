class GameState { //<>//
  private Board _b;
  private Player _current;

  GameState() {
    _b = new Board();
    _current = (random(1) > 0.5) ? Player.HUMAN : Player.COMPUTER;
  }

  GameState(Board b, Player c) {
    _b = b;
    _current = c;
  }

  public Board getBoard() {
    return _b;
  }

  public void makeMove(Player p, int index) {
    _b.setMove(p, index);
  }

  public void makeMove(int i) {
    makeMove(_current, i);
    _current = _current == Player.HUMAN ? Player.COMPUTER : Player.HUMAN;
  }

  public Player getCurrent() {
    return _current;
  }

  public boolean isUnoccupied(int i) {
    return (_b.getPlayer()[i] == Player.EMPTY);
  }

  public boolean checkFull() {
    return _b.checkFull();
  }

  public Player checkWin() {
    //check row
    for (int r = 0; r < 3; r++) {
      if (_b.getPlayer()[r * 3] != Player.EMPTY && _b.getPlayer()[r * 3] == _b.getPlayer()[r * 3 + 1] && _b.getPlayer()[r * 3 + 1] == _b.getPlayer()[r * 3 + 2]) {
        return _b.getPlayer()[r * 3];
      }
    }

    //check colnm
    for (int c = 0; c < 3; c++) {
      if (_b.getPlayer()[c] != Player.EMPTY && _b.getPlayer()[c] == _b.getPlayer()[c + 3] && _b.getPlayer()[c + 3] == _b.getPlayer()[c + 6]) {
        return _b.getPlayer()[c];
      }
    }

    //check diagonals
    boolean loru =_b.getPlayer()[0] != Player.EMPTY && _b.getPlayer()[0] == _b.getPlayer()[4] && _b.getPlayer()[4] == _b.getPlayer()[8];
    boolean rolu =_b.getPlayer()[2] != Player.EMPTY && _b.getPlayer()[2] == _b.getPlayer()[4] && _b.getPlayer()[4] == _b.getPlayer()[6];
    if (loru || rolu) {
      return _b.getPlayer()[4];
    }
    return null;
  }
}

enum Player {
  HUMAN, COMPUTER, EMPTY
}

class Board {
  private Player[] _players;

  Board() {
    _players = new Player[9];
    for (int i = 0; i < _players.length; i++) {
      _players[i] = Player.EMPTY;
    }
  }

  public boolean checkFull() {
    for (int i = 0; i < _players.length; i++) {
      if (_players[i] == Player.EMPTY) return false;
    }
    return true;
  }

  public Board copy() {
    Board copy = new Board();

    for (int i = 0; i < _players.length; i++) {
      copy.setMove(_players[i], i);
    }

    return copy;
  }

  public void setMove(Player p, int index) {
    if ((index < 0 || index > 9)||(_players[index] != Player.EMPTY)) {
      System.err.println("Invalid argument: " + index + ", " + p);
      return;
    }
    _players[index] = p;
  }

  public Player[] getPlayer() {
    return _players;
  }
}

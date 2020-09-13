import java.util.List;
import java.util.LinkedList;
import java.util.Collections;
import java.util.Map.Entry;

Minimax game;

void setup() {
  size(400, 400);
  game = new Minimax();
  ellipseMode(CORNER);
}

void draw() {
  if (mousePressed && game.getCurrent() == Player.HUMAN) {
    int x = floor(mouseX / (width / 3));
    int y = floor(mouseY / (height / 3));
    int i = x + 3 * y;
    if (game.isUnoccupied(i)) {
      game.makeMove(i);
      if (game.checkWin() != null) {
        noLoop();
      }
    }
  } else if (game.getCurrent() == Player.COMPUTER) {
    game.smartMove();
    Player winner = game.checkWin();
    if (winner != null) {
      println(game.checkWin()+" wins!");
      noLoop();
      redraw();
    }
  }

  background(255);
  game.show();
}

class Minimax extends Game {
  public void smartMove() {
    if (game.getCurrent() != Player.COMPUTER) return;

    List<GameState> poss = allPossibleStates(this);
    HashMap<GameState, Integer> points = new HashMap<GameState, Integer>();
    for (GameState state : poss) {
      points.put(state, bewerte(state, 0));
    }

    Entry<GameState, Integer> max = null;
    for (Entry<GameState, Integer> entry : points.entrySet()) {
      if (max == null || max.getValue() < entry.getValue()) {
        max = entry;
      }
    }

    if (max != null) {
      GameState bestState = max.getKey();
      Player[] p =bestState.getBoard().getPlayer();
      for (int i = 0; i< p.length; i++) {
        if (p[i] != game.getBoard().getPlayer()[i]) {
          game.makeMove(i);
          return;
        }
      }
    }
  }

  public Integer bewerte(GameState state, int depth) {
    Player winner = state.checkWin();
    if (winner != null) {
      return winner == Player.COMPUTER ? 100-depth : -100+depth;
    } else if (state.checkFull()) {
      return -20;
    } else {
      // go deeper
      List<GameState> poss = allPossibleStates(state);
      HashMap<GameState, Integer> points = new HashMap<GameState, Integer>();
      for (GameState s : poss) {
        points.put(s, bewerte(s, depth+1));
      }

      if (state.getCurrent() == Player.HUMAN) {// Mini
        return Collections.min(points.values());
      } else if (state.getCurrent() == Player.COMPUTER) {// Max
        return Collections.max(points.values());
      }

      return -1;
    }
  }

  private List<GameState> allPossibleStates(GameState state) {
    List<GameState> poss = new LinkedList<GameState>();

    List<Integer> fields = new ArrayList<Integer>();
    for (int i = 0; i < 9; i++) {
      if (state.isUnoccupied(i)) fields.add(i);
    }

    Player c = state.getCurrent();
    Player next = (c == Player.COMPUTER) ? Player.HUMAN: Player.COMPUTER;

    for (int field : fields) { 
      Board nextB = state.getBoard().copy();
      nextB.setMove(c, field);
      poss.add(new GameState(nextB, next));
    }

    return poss;
  }
}

class Game extends GameState {
  public void randomMove() {
    if (game.getCurrent() != Player.COMPUTER) return;
    List<Integer> poss = new ArrayList<Integer>();
    for (int i = 0; i < 9; i++) {
      if (isUnoccupied(i)) poss.add(i);
    }

    makeMove(poss.get(floor(random(poss.size()))));
  }

  public void show() {
    stroke(0);
    strokeWeight(2);
    noFill();

    showGrid();
    showPlayer();
  }

  private void showGrid() {
    line(width/3, 0, width/3, height);
    line(2*width/3, 0, 2*width/3, height);
    line(0, height/3, width, height/3);
    line(0, 2*height/3, width, 2*height/3);
  }

  private void showPlayer() {
    for (int x = 0; x < 3; x++) {
      for (int y = 0; y < 3; y++) {
        int i = x + 3 * y; 
        pushMatrix();
        translate(x*width/3, y*height/3);
        Player p = getBoard().getPlayer()[i];
        float buffer = 0.1*width/3;

        if (p == Player.HUMAN) { // draw X 
          line(buffer, buffer, width/3-buffer, height/3-buffer);
          line(width/3-buffer, buffer, buffer, height/3-buffer);
        } else if (p == Player.COMPUTER) { // draw O
          ellipse(buffer, buffer, width/3-2*buffer, height/3-2*buffer);
        }

        popMatrix();
      }
    }
  }
}

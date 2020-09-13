class Tile {
   int num;
   PVector startPunkt;
   int state = 0; //0:aus, 1:stunde, 2:minute, 3:stunde und minute
   Tile(Integer t_num, PVector t_startPunkt) {
      num = t_num;
      startPunkt = t_startPunkt;
   }

   void show() {
      color c = getColor();
      fill(c); 
      rect(startPunkt.x*zoom, startPunkt.y*zoom, num*zoom, num*zoom);
   }

   color getColor() {
      if (state == 1) return color(onlyHours);
      if (state == 2) return color(onlyMinutes);
      if (state == 3) return color(hoursAndMinutes);
      return color(255);
   }
}

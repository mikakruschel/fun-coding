color onlyHours = #e74c3c; //red
color hoursAndMinutes = #e67e22; //orange
color onlyMinutes = #f1c40f; //yellow

int lastMinute=-1;

Tile[] tiles;
int[] fibonacci = {1, 1, 2, 3, 5};

PVector[] startPoints = {new PVector(2, 0), new PVector(2, 1), new PVector(0, 0), new PVector(0, 2), new PVector(3, 0)};

int zoom = 100;

Table table;
NumFibonacci[] numFibo;

void setup() {
   surface.setSize(8*zoom, 5*zoom);

   table = loadTable("fibonacci.csv", "csv");

   numFibo = new NumFibonacci[table.getRowCount()]; 
   for (int i = 0; i < table.getRowCount(); i++) {
      TableRow row = table.getRow(i);

      boolean oneone = row.getInt(1) == 1;
      boolean onetwo = row.getInt(2) == 1;
      boolean two = row.getInt(3) == 1;
      boolean three = row.getInt(4) == 1;
      boolean five = row.getInt(5) == 1;

      numFibo[i] = new NumFibonacci(row.getInt(0), oneone, onetwo, two, three, five);
   }


   stroke(0);
   strokeWeight(2);

   tiles = new Tile[fibonacci.length];
   for (int i =0; i<fibonacci.length; i++) {
      tiles[i] = new Tile(fibonacci[i], startPoints[i]);
   }
}

void draw() {
   frameRate(0.5); 
   //println(NumFibonacci(0));

   if (lastMinute != getMin()) {
      background(255); 
      updateClock();
   }
}

void updateClock() {
   println("Update Clock"); 

   int hour = hour() % 12; 
   int min = getMin(); 
   lastMinute = min; 

   int[] states = getStates(hour, min);
   //println(states.length);
   for (int i = 0; i < tiles.length; i++) {
      /*if (states.length - 1 > i) */tiles[i].state = states[i];
      tiles[i].show();
   }
}

int getMin() {
   //5 minute increments (0 to 12) 
   int min = minute(); 
   min = floor(min/5); 
   return min;
}

int[] getStates(int hours, int minutes) {
   int[] states = new int[fibonacci.length];

   //Hours
   ArrayList<Integer> indeces_h = new ArrayList<Integer>();

   for (int i = 0; i < numFibo.length; i++) {
      if (numFibo[i].num == hours) indeces_h.add(i);
   }

   int index_h = indeces_h.get(floor(random(indeces_h.size())));

   if (numFibo[index_h].oneOne) states[0] += 1;
   if (numFibo[index_h].oneTwo) states[1] += 1;
   if (numFibo[index_h].two) states[2] += 1;
   if (numFibo[index_h].three) states[3] += 1;
   if (numFibo[index_h].five) states[4] += 1;

   //Minutes
   ArrayList<Integer> indeces_m = new ArrayList<Integer>();

   for (int i = 0; i < numFibo.length; i++) {
      if (numFibo[i].num == minutes) indeces_m.add(i);
   }

   int index_m = indeces_m.get(floor(random(indeces_m.size())));

   if (numFibo[index_m].oneOne) states[0] += 2;
   if (numFibo[index_m].oneTwo) states[1] += 2;
   if (numFibo[index_m].two) states[2] += 2;
   if (numFibo[index_m].three) states[3] += 2;
   if (numFibo[index_m].five) states[4] += 2;

   return states;
}

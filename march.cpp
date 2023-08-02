#include <stdio.h>
#include <math.h>

extern "C" {
int main() {
  printf("hello, world!\n");
  return 0;
}

int int_sqrt(int x) {
  return sqrt(x);
}

}
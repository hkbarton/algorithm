#include <stdio.h>
#include <stdlib.h>

void printArray(int *a, int n){
  int i=0;
  for (i=0;i<n;i++){
    printf("%d, ", a[i]);
  }
  printf("\n");
}

int* duplicateArray(int *src, int n){
  int *result = malloc(sizeof(int)*n);
  int i=0;
  for(i=0;i<n;i++){
    result[i] = src[i];
  }
  return result;
}

void _bubbleSort(int* input int n){
}

int main(){
  int n=16;
  int testData[16] = {99,5,2,1,31,15,25,12,35,33,56,78,21,34,30,55};
  int *copy = duplicateArray(&testData[0], n);
  copy[2] = 555;
  printArray(&testData[0], n);
  printArray(copy, n);
  free(copy);
  return 0;
}

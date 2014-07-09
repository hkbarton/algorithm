#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define MIN(X,Y) ((X) < (Y) ? (X) : (Y))

void printArray(int *a, int n){
  int i=0;
  for (i=0;i<n;i++){
    printf("%d, ", a[i]);
  }
  printf("\n");
}

void duplicateArray(int *src, int *dest, int n){
  int i=0;
  for(i=0;i<n;i++){
    dest[i] = src[i];
  }
}

/* ---Bubble Sort---*/
void bubbleSort(int *input, int n){
  int i,j;
  for(i=0;i<n;i++){
    for(j=0;j<n-i-1;j++){
      if(input[j]>input[j+1]){
        int tmp = input[j];
        input[j] = input[j+1];
        input[j+1] = tmp;
      }
    }
  }
}

/* ---Insertion Sort, efficent for small array---*/
void insertSort(int *input, int n){
  int i,j;
  for(i=1;i<n;i++){
    int tmp = input[i];
    j = i - 1;
    while(j>=0 && input[j]>tmp){
      input[j+1] = input[j];
      j--;
    }
    input[j+1] = tmp;
  }
}

/* ---Merge Sort, bottom up---*/
void _merge(int *a, int start, int middle, int end, int *store){
  int ia = start;
  int ib = middle;
  int i;
  for (i=start;i<end;i++){
    if ((ia<middle && ib<end && a[ia]<a[ib]) || (ia<middle && ib>=end)){
      store[i] = a[ia];
      ia++;
    }else{
      store[i] = a[ib];
      ib++;
    }
  }
}

void mergeSort(int *input, int n){
  int *bak = malloc(sizeof(int)*n);
  int *handle = input;
  int *store = bak;
  int width,i;
  for(width=1;width<n;width=2*width){
    for(i=0;i<n;i=i+2*width){
      _merge(handle, i, MIN(i+width,n), MIN(i+2*width,n),store);
    }
    if (handle==input) handle = bak; else if (handle==bak) handle = input;
    if (store==input) store = bak; else if (store==bak) store = input;
  }
  free(bak);
}

/* ---Quick Sort---*/
int _partition(int *a, int left, int right){
  int pivotIndex = right;
  int k = left;
  int tmp,i;
  for(i=left;i<=right-1;i++){
    if (a[i]<=a[pivotIndex]){
      tmp = a[i];
      a[i] = a[k];
      a[k] = tmp;
      k++;
    }
  }
  tmp = a[k];
  a[k] = a[pivotIndex];
  a[pivotIndex] = tmp;
  return k;
}

void _qsort(int *a, int left, int right){
  if (left<right){
    int pivotIndex = _partition(a, left, right);
    _qsort(a, left, pivotIndex-1);
    _qsort(a, pivotIndex+1 ,right);
  }
}

void quickSort(int *a, int n){
  _qsort(a, 0, n-1);
}

/* ---Radix Sort---*/
void radixSort(int *a, int n){
  int k = 0;
  int i;
  for(i=0;i<n;i++){
    if (a[i]>k) k = a[i];
  }
  int *store = malloc(sizeof(int)*n);
  int e = 1;
  int *workArray = a;
  int *tmpArray = store;
  int zc = 0;
  while(k/e>0){
    int buckets[10] = {0};
    for(i=0;i<n;i++){
      buckets[(workArray[i]/e)%10]++;
    }
    for(i=1;i<10;i++){
      buckets[i] += buckets[i-1];
    }
    for(i=n-1;i>=0;i--){
      tmpArray[--buckets[(workArray[i]/e)%10]] = workArray[i];
    }
    if(workArray==a) workArray = store; else if(workArray==store) workArray = a;
    if(tmpArray==a) tmpArray = store; else if(tmpArray==store) tmpArray = a;
    e*=10;
    zc++;
  }
  // copy back
  if(zc%2>0){
    for(i=0;i<n;i++){
      a[i] = store[i];
    }
  }
  free(store);
}

/* --- Begin Test---*/
void test(void(*fun)(int*, int), int *input, int n, char *text){
  printf("%s\n", text);
  // output result
  int *array = malloc(sizeof(int)*n);
  duplicateArray(input, array, n);
  fun(array, n);
  printArray(array, n);
  free(array);
  // test performance
  int *ta = malloc(sizeof(int)*n);
  clock_t start = clock();
  int i=0;
  for(i=0;i<100000;i++){
    duplicateArray(input, ta, n);
    fun(ta, n);
  }
  clock_t end = clock();
  printf("Cost: %f\n", (double)(end-start)/CLOCKS_PER_SEC);
  free(ta);
  printf("\n");
}

int main(){
  int n=200;
  int testData[200] = {0};
  int i = 0;
  srand(time(NULL));
  for(i=0;i<n;i++){
    testData[i] = rand()%200 + 1;
  }
  printf("Ori Array:\n");
  printArray(&testData[0], n);
  printf("\n");
  test(&bubbleSort, &testData[0], n, "Bubble Sort");
  test(&insertSort, &testData[0], n, "Insertion Sort");
  test(&mergeSort, &testData[0], n, "Merge Sort");
  test(&quickSort, &testData[0], n, "Quick Sort");
  test(&radixSort, &testData[0], n, "Radix Sort");
  return 0;
}

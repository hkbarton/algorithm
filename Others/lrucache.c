/*
LRU Cache

Caches are a key element in scaling a system. One popular form of cache is called a Least Recently Used Cache (http://en.wikipedia.org/wiki/Cache_algorithms#Least_Recently_Used). Your task is to implement a cache that can be tested against a series of inputs. These actions should define an API you use for the cache object.

Your cache should store simple key/value strings of length up to 10 characters. It should also have a customizable upper bound to the number of keys that can be stored in the cache at any time. You do not have to be thread safe.

Possible Inputs:

BOUND    :  Set the upper bound. If the cache size is currently greater than this number, then extra entries must be removed following the LRU policy

SET   :  Set the value of this key

GET   :  Get the value of this key and prints to stdout.

PEEK   :  Gets the value of the key but does not mark it as being used. Prints the value to standard out.

DUMP  :  Prints the current state of the cache as a list of key/value pairs in alphabetical order by key.

 

Input Format:

First line of input contains an integer N,the number of commands.

The following N lines each describe a command.

Note: The first command will always be BOUND.

Output Format:

Print the appropriate outputs for GET , PEEK and DUMP commands. In case for GET/PEEK command if the key does not exist in the cache just output the string "NULL"(quotes are for clarity).

 

Sample Input

8
BOUND 2
SET a 2
SET b 4
GET b
PEEK a
SET c 5
GET a
DUMP

Sample Output

4
2
NULL
b 4
c 5

Constraints:

Total number of lines in input will be no more than 1,000,000(10^6)

Note: There may be DUMP commands scattered throughout the input file.
*/
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct CacheItem CacheItem;
struct CacheItem{
  char* key;
  char* value;
  CacheItem* prev;
  CacheItem* next;
};

CacheItem* cache = NULL;
int cachecap = 0;
int cachelen = 0;

void bound(int cap){
  cachecap = cap;
}

void _setItem(CacheItem* item, char* key, char* value){
  if(item->key!=NULL) free(item->key);
  item->key = malloc(sizeof(char)*(strlen(key)+1));
  item->key = strcpy(item->key, key);
  if(item->value!=NULL) free(item->value);
  item->value = malloc(sizeof(char)*(strlen(value)+1));
  item->value = strcpy(item->value, value);
}

void _newitem(char* key, char* value, CacheItem* prev, CacheItem* next){
  CacheItem* item = malloc(sizeof(CacheItem));
  item->key = NULL;
  item->value = NULL;
  _setItem(item, key, value);
  item->prev = prev;
  if(prev!=NULL) prev->next = item;
  item->next = next;
  if(next!=NULL) next->prev = item;
  cachelen++;
  cache = item;
  // clear expire cache item
  if (cachelen > cachecap){
    CacheItem* tc = cache;
    int i = 1;
    while(i<cachecap) { tc = tc->next;i++; }
    CacheItem* exp = tc->next;
    exp->prev = NULL;
    tc->next = NULL;
    free(exp->value);
    free(exp->key);
    free(exp);
    cachelen = cachecap;
  }
}

CacheItem* _access(char *key, char* value, int move){
  CacheItem* tc = cache;
  while(tc!=NULL && strcmp(tc->key, key)!=0) tc = tc->next;
  if (tc!=NULL){
    if (value!=NULL) _setItem(tc, key, value);
    if (move > 0 && tc!=cache){
      if (tc->prev!=NULL) tc->prev->next = tc->next;
      if (tc->next!=NULL) tc->next->prev = tc->prev;
      tc->prev = NULL;
      tc->next = cache;
      cache->prev = tc;
      cache = tc;
    }
  }
  return tc;
}

void set(char* key, char* value){
  if (cachecap > 0){
    if (cache==NULL){
      _newitem(key, value, NULL, NULL);
    }else{
      CacheItem* item = _access(key, value, 1);
      if (item==NULL){
        _newitem(key, value, NULL, cache);    
      }
    }
  }
}

char* get(char* key){
  if (cache!=NULL){
    CacheItem* item = _access(key, NULL, 1);
    if (item!=NULL) return item->value;
  }
  return NULL;
}

char* peek(char* key){
  if (cache!=NULL){
    CacheItem* item = _access(key, NULL, 0);
    if (item!=NULL) return item->value;
  }
  return NULL;
}

int _compareAplha(const void* a, const void* b){
  CacheItem* itema = *((CacheItem**)a);
  CacheItem* itemb = *((CacheItem**)b);
  return strcmp(itema->key, itemb->key);
}

void dump(){
  if (cache!=NULL){
    CacheItem** output = malloc(cachelen*sizeof(CacheItem*)); // output array
    CacheItem* tc = cache;
    int i = 0;
    while(tc!=NULL){
      output[i] = tc;
      tc = tc->next;
      i++;
    }
    qsort(output, cachelen, sizeof(CacheItem*), _compareAplha);
    for(i=0;i<cachelen;i++){
      printf("%s %s\n", output[i]->key, output[i]->value);
    }
    free(output);
  }
}

int main(){
  char* linebuf = NULL;
  size_t len;
  if(getline(&linebuf, &len, stdin)!=-1){
    int cmdcnt = (int)strtol(linebuf, NULL, 10);
    int readcnt = 0;
    if (cmdcnt==0){
      return 1;
    }
    while(readcnt < cmdcnt && getline(&linebuf, &len, stdin)!=-1){
      // read comand
      char** cmds = malloc(sizeof(char*)*3);
      char* cmdtok = strtok(strtok(linebuf,"\n"), " ");
      int i = 0;
      while(cmdtok!=NULL){
        cmds[i] = cmdtok;
        cmdtok = strtok(NULL, " ");
        i++;
      }
      // analysis command
      // not fully check input here
      if (strcmp(cmds[0],"BOUND")==0){
        bound((int)strtol(cmds[1],NULL,10));
      }else if(strcmp(cmds[0],"SET")==0){
        set(cmds[1], cmds[2]);
      }else if(strcmp(cmds[0],"GET")==0){
        char* v = get(cmds[1]);
        printf("%s\n", v!=NULL ? v : "NULL");
      }else if(strcmp(cmds[0],"PEEK")==0){
        char* v = peek(cmds[1]);
        printf("%s\n", v!=NULL ? v : "NULL");
      }else if(strcmp(cmds[0],"DUMP")==0){
        dump();
      }
      free(cmds);
      readcnt++;
    }
    free(linebuf);
  }
  return 0;
}

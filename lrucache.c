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
    if (move > 0){
      if (tc->prev!=NULL) tc->prev->next = tc->next;
      if (tc->next!=NULL) tc->next->prev = tc->prev;
      tc->prev = NULL;
      cache->prev = tc;
      tc->next = cache;
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
  return strcmp(((CacheItem*)a)->key, ((CacheItem*)b)->key);
}

void dump(){
  if (cache!=NULL){
    CacheItem** output = malloc(cachelen*sizeof(CacheItem*)); // output array
    CacheItem* tc = cache;
    int i = 0;
    while(tc!=NULL){
      output[i] = tc;
      printf("%s %s\r", output[i]->key, output[i]->value);
      tc = tc->next;
      i++;
    }
    qsort(output, cachelen, sizeof(CacheItem*), _compareAplha);
    for(i=0;i<cachelen;i++){
      printf("%s %s\r", output[i]->key, output[i]->value);
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
    while(getline(&linebuf, &len, stdin)!=-1 && readcnt < cmdcnt){
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
        printf("%s\n", get(cmds[1]));
      }else if(strcmp(cmds[0],"PEEK")==0){
        printf("%s\n", peek(cmds[1]));
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

#include "gwan.h" // G-WAN API

int main(int argc, char *argv[]) 
{
   xbuf_cat(get_reply(argv), "Always Coca-Cola");
   return 200; // HTTP status code
}
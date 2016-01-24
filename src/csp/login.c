#include "gwan.h"
#include <stdint.h>
#include <stdbool.h>
#include <string.h>

int main(int argc, char *argv[]) {
  uint8_t header[] = "Content-type: application/json\r\n";
  http_header(1, header, sizeof(header) - 1, argv);
  
  uint8_t *callback = 0;
  
  // Todo: don't accept get requests
  //
  // Check for required info:
  bool well_formed_request = false;
  bool callback_included = false;
  
  xbuf_xcat(get_reply(argv), strstr("callback", "callback") != NULL);
  
  if(strstr(argv, "callback") != NULL) {
    callback_included = true;
    get_arg("callback=", &callback, argc, argv);
    
    if(strstr(argv, "password") != NULL) {
      if(strstr(argv, "user") != NULL) {
        well_formed_request = true;
      }
      
    }
    
  }
  
  if(!well_formed_request) {
    if(callback_included) {
      xbuf_xcat(get_reply(argv), callback);
      xbuf_xcat(get_reply(argv), "(");
    } else {
      xbuf_xcat(get_reply(argv), "general(");
    }
    
    xbuf_xcat(get_reply(argv), "{token: {error: 'refused'}}");
    xbuf_xcat(get_reply(argv), ");");
    return 200;
  }
  
  uint8_t *username = 0;
  uint8_t *password = 0;
  
  get_arg("username=", &username, argc, argv);
  get_arg("password=", &password, argc, argv);
    
  if(strcmp(username, "mkeen") == 0) {
    if(strcmp(password, "sega1") == 0) {
      xbuf_xcat(get_reply(argv), callback);
      xbuf_xcat(get_reply(argv), "(");
      xbuf_xcat(get_reply(argv), "{token: '123'}");
      xbuf_xcat(get_reply(argv), ");");
    } else {
      xbuf_xcat(get_reply(argv), callback);
      xbuf_xcat(get_reply(argv), "(");
      xbuf_xcat(get_reply(argv), "{error: 'login failed'}");
      xbuf_xcat(get_reply(argv), ");");
    }
    
  } else {
    xbuf_xcat(get_reply(argv), callback);
    xbuf_xcat(get_reply(argv), "(");
    xbuf_xcat(get_reply(argv), "{error: 'login failed'}");
    xbuf_xcat(get_reply(argv), ");");
  }
  
  return 200;
}
